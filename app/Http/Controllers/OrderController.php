<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Events\OrderCreated;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Kreait\Firebase\Messaging\ApnsConfig;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!request('timeline')) {
            $query = Order::query()->with('user')
                ->where('production_status', '!=','delivered')
                ->orderBy('delivery_date', 'asc');
        } else {
            $query = Order::query()->with('user')
                ->where('production_status', '!=','delivered');
        }

        if (request('delivery_date')) {
            $query->where('delivery_date', '=', Carbon::parse(request('delivery_date')));
        }

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('production_status', request('status'));
        }

        if (request('timeline')) {
            if (request('timeline') == 'newest') {
                $query->whereDate('created_at', Carbon::now())->orderBy('created_at', 'desc');
            } else if (request('timeline') == 'today') {
                $query->whereDate('delivery_date', Carbon::now());
            } else {
                $query->whereBetween('delivery_date', [Carbon::now()->subDay(), Carbon::now()->addDays((int)request('timeline'))]);
                $query->orderBy('delivery_date', 'asc');
            }
        }

        $orders = $query->paginate(9)->onEachSide(1);

        $orders->appends(request()->query());

        $ordersCollection = $orders->getCollection()->map(function ($order) {
            return (new OrderResource($order))->withDateFormat('d-m-Y');
        });

        $orders->setCollection($ordersCollection);

        return inertia("Order/Index", [
            'orders' => OrderResource::collection($orders),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Order/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $data = $request->validated();

        /** @var \Illuminate\Http\UploadedFile|null $image */
        $image = $data['image_path'] ?? null;

        $data['user_id'] = auth()->id();

        if ($image) {
            // Prepare paths
            $originalPath = $image->getRealPath(); // Original HEIC file
            $directory = 'order/' . Str::random(10) . '-' . time();
            $filename = Str::random(20) . '.jpg'; // Target JPEG filename
            $jpegPath = storage_path("app/public/{$directory}/{$filename}");

            // Create directory
            Storage::disk('public')->makeDirectory($directory);

            if ($image->getClientOriginalExtension() === 'HEIC' || $image->getClientOriginalExtension() === 'HEIF') {
                // Convert HEIC to JPEG using heif-convert
                exec("heif-convert {$originalPath} {$jpegPath}", $output, $result);

                // Check if conversion succeeded
                if ($result !== 0 || !file_exists($jpegPath)) {
                    dump("Failed to convert {$originalPath} {$jpegPath}");
                    return back()->with('error', 'Failed to process HEIC image.');
                }
            } else {
                $image->move(storage_path("app/public/{$directory}"), $filename);
            }

            // Resize the converted JPEG image
            $resizedImage = Image::make($jpegPath)
                ->orientate()
                ->resize(1920, 1080, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });

            $resizedImage->save($jpegPath, 100);

            // Save path in database
            $data['image_path'] = "{$directory}/{$filename}";
        }

        $data['updated_by'] = auth()->id();

        // Store order
        $order = Order::create($data);

        // Fire an event for the new order
//        broadcast(new OrderCreated($order, auth()->id())); RED SCREEN POPUP

        $notificationController = new PushNotificationController();
        $notificationController->sendPushNotification($order, 'create');

        return to_route("order.index")->with("success", "Нарачката е успешно креирана!");
    }


    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load("user", "updatedBy");

        return inertia('Order/Show', [
            'order' => (new OrderResource($order))->withDateFormat('d-m-Y')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        $orderResource = new OrderResource($order);

        $orderResource['delivery_date'] = Carbon::parse($orderResource['delivery_date'])->format('Y-m-d');


        return inertia('Order/Edit', [
            'order' => $orderResource
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;

        if ($image) {
           $customName = Str::random() . '-' . time();

            // Delete the existing image and its directory if it exists
            if ($order->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($order->image_path));
            }

            // Save the new image in the "order/{custom_name}" directory
            $data['image_path'] = $image->store("order/$customName", 'public');
        } else {
            unset($data['image']);
        }

        // Update the order with the new data
        $order->update($data);
        $order->updated_by = auth()->id();

        $order->save();

        $order = Order::find($order->id);

        $notificationController = new PushNotificationController();
        $notificationController->sendPushNotification($order, 'update');

        return to_route("order.index")->with("success", "Нарачката " . $order->name . " е успешно изменета!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $name = $order->name;
        $order->delete();
        if ($order->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($order->image_path));
        }


        return to_route('order.index')->with('success', 'Нарачката ' . $name . ' е успешно избришана!');
    }

    public function updateStatus(Request $request, Order $order)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'production_status' => 'required|string|in:pending,processing',
        ]);

        // Update the order's production status
        $order->production_status = $validated['production_status'];
        $order->save();

        // Return a success response
        return redirect()->back()->with('success', 'Order status updated successfully!');
    }

}
