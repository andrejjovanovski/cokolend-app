<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function Termwind\render;

class DashboardController extends Controller
{
    public function dashboard()
    {

        $pendingOrders = Order::where('production_status', 'pending')->count();
        $inProgressOrders = Order::where('production_status', 'processing')->count();
        $deliveredOrders = Order::where('production_status', 'delivered')->count();
        $forDelivery = Order::where('delivery_date', '=', date('Y-m-d'))->count();
        $allOrders = Order::where('production_status', '!=', 'completed')->count();
        $ordersToday = Order::whereDate('created_at', '=', Carbon::today())->count();
        $ordersTodayShop = Order::whereDate('created_at', date('Y-m-d'))
            ->where('user_id', 2)
            ->count();

        $ordersTodayRemote = Order::whereDate('created_at', date('Y-m-d'))
            ->where('user_id', '!=', 2)
            ->count();

        $stats = [
            'pendingOrders' => $pendingOrders,
            'inProgressOrders' => $inProgressOrders,
            'deliveredOrders' => $deliveredOrders,
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
