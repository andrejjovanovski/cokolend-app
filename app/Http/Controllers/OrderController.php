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

        // $orders = Order::with('user')->paginate(9)->onEachSide(1);

        $query = Order::query()->with('user')->latest();

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
                $query->whereBetween('delivery_date', [Carbon::now(), Carbon::now()->addDays((int)request('timeline'))]);
            }
        }

        $orders = $query->paginate(9)->onEachSide(1);

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

        if ($data['delivery_location_custom'] != null) {
            $data['delivery_location'] = $data['delivery_location_custom'];
        }

        Order::create($data);

        return to_route("order.index")->with("success", "Order created successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load("user");

        return inertia('Order/Show', [
            'order' => new OrderResource($order)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image_path'] ?? null;

        $data['user_id'] = auth()->id();

        if ($image) {
            if (Storage::disk('public')->delete($order->image_path)) ;
            $data['image_path'] = $image->store('order/' . Str::random() . '-' . time(), 'public');
        }
        $order->update($data);

        return to_route("order.index")->with("success", "Нарачката е успешно креирана");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $name = $order->name;
        $order->delete();

        return to_route('order.index')->with('success', 'Нарачката ' . $name . ' е успешно избришана!');
    }

    public function updateStatus(Request $request, Order $order)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'production_status' => 'required|string|in:pending,processing,completed',
        ]);

        // Update the order's production status
        $order->production_status = $validated['production_status'];
        $order->save();

        // Return a success response
        return redirect()->back()->with('success', 'Order status updated successfully!');
    }
}
