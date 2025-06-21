<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class CMSController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function dashboard()
    {

        $users = User::all();

        $roles = Role::all();

        return Inertia::render("Cms/Dashboard", [
            'users' => UserResource::collection($users),
            'roles' => $roles
        ]);
    }

}
