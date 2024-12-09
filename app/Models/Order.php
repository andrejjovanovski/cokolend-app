<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'image_path',
        'name',
        'description',
        'price',
        'production_status',
        'delivery_location',
        'delivery_date',
        'delivery_time',
        'delivered',
        'customer_name',
        'customer_phone_number',

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
