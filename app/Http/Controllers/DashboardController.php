<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard()
    {

        $pendingOrders = Order::where('production_status', 'pending')->count();
        $inProgressOrders = Order::where('production_status', 'in-progress')->count();
        $completedOrders = Order::where('production_status', 'completed')->count();
        $forDelivery = Order::where('delivery_date', '=', date('Y-m-d'))->count();
        $allOrders = Order::where('production_status', '!=', 'completed')->count();
        $ordersToday = Order::where('created_at', '=', date('Y-m-d'))->count();
        $ordersTodayShop = Order::where('created_at', '=', date('Y-m-d'))
            ->where('user_id', 1)
            ->count();
        $ordersTodayRemote = Order::where('created_at', '=', date('Y-m-d'))
            ->where('user_id', '!=', '1')
            ->count();

        $stats = [
            'pendingOrders' => $pendingOrders,
            'inProgressOrders' => $inProgressOrders,
            'completedOrders' => $completedOrders,
            'forDelivery' => $forDelivery,
            'allOrders' => $allOrders,
            'ordersToday' => $ordersToday,
            'ordersTodayShop' => $ordersTodayShop,
            'ordersTodayRemote' => $ordersTodayRemote,
        ];

        return inertia("Order/Index", [
            'stats' => $stats
        ]);
    }


}
