<?php

use App\Http\Controllers\CMSController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PushNotificationController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

    Route::resource('order', OrderController::class);
    Route::resource('user', UserController::class);
    Route::resource('delivery', DeliveryController::class);
    Route::get('/cms-dashboard', [CMSController::class, 'dashboard'])->name('cms-dashboard');

    Route::post('/orders/{order}/mark-as-delivered', [DeliveryController::class, 'markAsDelivered'])->name('orders.mark-as-delivered');
    Route::post('/orders/{order}/update-status', [OrderController::class, 'updateStatus'])->name('order.update-status');

    Route::post('/roles/update', [RoleController::class, 'update'])->name('roles.update');

});

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

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

Route::post('user/update-fcm-token', [UserController::class, 'updateFcmToken'])
    ->name('user.update.fcm-token')
    ->middleware('auth:sanctum');


Route::post('save-push-notification-sub', [PushNotificationController::class, 'saveSubscription']);
Route::post('send-push-notification', [PushNotificationController::class, 'sendPushNotification']);

require __DIR__ . '/auth.php';
