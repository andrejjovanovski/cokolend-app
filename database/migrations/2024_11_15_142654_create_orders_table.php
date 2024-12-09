<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained('users');
            $table->string('image_path');
            $table->string('name');
            $table->text('description');
            $table->string('price');
            $table->enum('production_status', ['pending', 'processing', 'completed', 'delivered'])->default('pending');
            $table->string('delivery_location');
            $table->date('delivery_date');
            $table->time('delivery_time');
            $table->boolean('delivered')->default(false);
            $table->string('customer_name');
            $table->string('customer_phone_number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
