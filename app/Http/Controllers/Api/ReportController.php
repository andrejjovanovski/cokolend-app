<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    /**
     * Return detailed (PDF) report for orders in the selected period
     */
    public function detailedReport(Request $request)
    {
        //
    }

    /**
     * Return summary report for orders in the selected period.
     */
    public function summaryReport(Request $request)
    {
        $endDate = Carbon::now()->endOfDay();

        switch ($request['report_filter']) {
            case 'weekly':
                $startDate = Carbon::now()->subDays(7)->startOfDay();
                break;
            case 'monthly':
                $startDate = Carbon::now()->subDays(31)->startOfDay();
                break;
            case 'yearly':
                $startDate = Carbon::now()->subDays(365)->startOfDay();
                break;
            default:
                return response()->json(['error' => 'Invalid report_filter'], 422);
        }

        $report = [
            'total_orders' => Order::whereBetween('delivery_date', [$startDate, $endDate])->count(),
            'total_revenue' => Order::whereBetween('delivery_date', [$startDate, $endDate])->sum('price'),
            'date_range' => $startDate->format('d.m.Y') . ' - ' . $endDate->format('d.m.Y'),
        ];

        return response()->json($report);
    }
}
