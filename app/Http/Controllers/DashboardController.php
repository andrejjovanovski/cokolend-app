<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard() {
        $pendingOrders = Order::where('production_status', 'pending')->count();
        $inProgressOrders = Order::where('production_status', 'in-progress')->count();
        $completedOrders = Order::where('production_status', 'completed')->count();
        $forDelivery = Order::where('delivery_date', '=', date('Y-m-d'))->count();
    }
}
