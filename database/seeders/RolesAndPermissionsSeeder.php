<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create(['name' => 'admin']);
        $production = Role::create(['name' => 'production']);
        $sales = Role::create(['name' => 'sales']);

        $viewOrders = Permission::create(['name' => 'view orders']);
        $createOrders = Permission::create(['name' => 'create orders']);
        $editOrders = Permission::create(['name' => 'edit orders']);
        $deleteOrders = Permission::create(['name' => 'delete orders']);
        $viewDashboardOrderStatistics = Permission::create(['name' => 'view dashboard order statistics']);
        $viewUsers = Permission::create(['name' => 'view users']);
        $createUsers = Permission::create(['name' => 'create users']);
        $editUsers = Permission::create(['name' => 'edit users']);
        $deleteUsers = Permission::create(['name' => 'delete users']);


        //SALES ROLES PERMISSION ASSIGMENT
        $sales->givePermissionTo($viewOrders);
        $sales->givePermissionTo($createOrders);
        $sales->givePermissionTo($editOrders);

        //PRODUCTION ROLES PERMISSION ASSIGMENT
        $production->givePermissionTo($viewOrders);
        $production->givePermissionTo($createOrders);
        $production->givePermissionTo($editOrders);
        $production->givePermissionTo($deleteOrders);
        $sales->givePermissionTo($viewDashboardOrderStatistics);

        //ADMIN ROLES PERMISSION ASSIGMENT
        $production->givePermissionTo($viewOrders);
        $production->givePermissionTo($createOrders);
        $production->givePermissionTo($editOrders);
        $production->givePermissionTo($deleteOrders);
        $sales->givePermissionTo($viewDashboardOrderStatistics);
        $sales->givePermissionTo($viewUsers);
        $sales->givePermissionTo($createUsers);
        $sales->givePermissionTo($editUsers);
        $sales->givePermissionTo($deleteUsers);

    }
}
