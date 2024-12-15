<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!request('timeline')) {
            $query = Order::query()->with('user')->orderBy('delivery_date', 'asc');
        } else {
            $query = Order::query()->with('user');
        }

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('production_status', request('status'));
        }

        if (request('timeline')) {
            if (request('timeline') == 'today') {
                $query->whereDate('delivery_date', Carbon::now());
            } else {
                $query->whereBetween('delivery_date', [Carbon::now()->subDay(), Carbon::now()->addDays((int)request('timeline'))]);
                $query->orderBy('delivery_date', 'asc');
            }
        }

        $orders = $query->paginate(9)->onEachSide(1);

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

        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image_path'] ?? null;

        $data['user_id'] = auth()->id();

        if ($image) {
            $data['image_path'] = $image->store('order/' . Str::random() . '-' . time(), 'public');
        }

        Order::create($data);

        return to_route("order.index")->with("success", "Нарачката " . $data->name . " е успешно креирана!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load("user");

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
//        dd($request->validated());
        $data = $request->validated();
        $image = $data['image'] ?? null;



        if ($image) {
            if ($order->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($order->image_path));
            }
            $data['image_path'] = $image->store('order/' . Str::random() . '-' . time(), 'public');
        }
        $order->update($data);

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
