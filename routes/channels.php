<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\User;

//Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//    return (int) $user->id === (int) $id;
//});

Broadcast::channel('orders', function ($user) {
    return $user != null; // Returns true for any authenticated user
});
