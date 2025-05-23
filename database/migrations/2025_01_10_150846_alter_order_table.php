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
        if (!Schema::hasColumn('orders', 'updated_by')) {
            Schema::table('orders', function (Blueprint $table) {
                $table->foreignId('updated_by')->nullable()->references('id')->on('users');
            });
        }
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('updated_by');
            $table->dropForeign('orders_updated_by_foreign');
        });
    }
};
