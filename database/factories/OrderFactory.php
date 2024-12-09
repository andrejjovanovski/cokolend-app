<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'description' => fake()->realText(),
            'name' => fake()->sentence(3),
            'image_path' => fake()->imageUrl(),
            'price' => fake()->randomNumber('4'),
            'production_status' => fake()->randomElement(['pending', 'processing', 'completed', 'delivered']),
            'delivery_date' => fake()->dateTimeBetween('now', '+1 years')->format('Y-m-d'),
            'delivery_location' => fake()->streetAddress(),
            'delivery_time' => fake()->dateTimeBetween('now', '+1 years')->format('H:i'),
            'delivered' => fake()->randomElement([0, 1]),
            'customer_name' => fake()->name(),
            'customer_phone_number' => fake()->phoneNumber(),
        ];
    }
}
