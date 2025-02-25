<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Inertia\Response;
use Inertia\ResponseFactory;

class DeliveryController extends Controller
{
    public function markAsDelivered(Order $order) {

        // Check if the order exists and mark it as delivered
        if ($order) {
            $order->delivered = 1;
            $order->production_status = 'delivered';
            $order->save();

            return redirect()->back()->with('success', 'Order marked as delivered');
        }

        return redirect()->back()->with('error', 'Order not found', 404);
    }

    /**
     * @return Response|ResponseFactory
     */
    public function index() {
        $deliveries = Order::with('user')
            ->where('production_status','!=' ,'pending')
            ->where('delivery_date', '=', today())
            ->get();


        return inertia("Delivery/Index", [
            'deliveries' => OrderResource::collection($deliveries)
        ]);
    }
}
