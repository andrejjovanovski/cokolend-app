<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Andrej',
            'email' => 'andrej@cokolend.com',
            'password' => bcrypt('andrej'),
        ]);

        Order::factory()->count(50)->create();
    }
}
