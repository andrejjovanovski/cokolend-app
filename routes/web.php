<?php

use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::resource('order', OrderController::class);
    Route::resource('user', UserController::class);

    Route::post('/orders/{order}/mark-as-delivered', [DeliveryController::class, 'markAsDelivered'])->name('orders.mark-as-delivered');
    Route::post('/orders/{order}/update-status', [OrderController::class, 'updateStatus'])->name('order.update-status');


});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/set-locale/{locale}', function ($locale) {
    session(['locale' => $locale]);
    App::setLocale($locale);

    return redirect()->back();
});

require __DIR__ . '/auth.php';
