<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function Termwind\render;

class DashboardController extends Controller
{
    public function dashboard()
    {

        $pendingOrders = Order::where('production_status', 'pending')->count();
        $inProgressOrders = Order::where('production_status', 'processing')->count();
        $completedOrders = Order::where('production_status', 'completed')->count();
        $forDelivery = Order::where('delivery_date', '=', date('Y-m-d'))->count();
        $allOrders = Order::where('production_status', '!=', 'completed')->count();
        $ordersToday = Order::where('created_at', '=', date('Y-m-d'))->count();
        $ordersTodayShop = Order::whereDate('created_at', date('Y-m-d'))
            ->where('user_id', 2)
            ->count();

        $ordersTodayRemote = Order::whereDate('created_at', date('Y-m-d'))
            ->where('user_id', '!=', 2) // Notice '1' is an integer here
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


        return Inertia::render("Dashboard", [
            'stats' => $stats,
        ]);
    }


}
