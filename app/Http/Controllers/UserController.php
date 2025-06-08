<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'role' => 'required|string|exists:roles,name',
            'password' => 'nullable|string|min:6',
        ]);

        $user = User::findOrFail($request->user_id);
        $user->syncRoles([$request->role]);

        if ($request->filled('password')) {
            $user['password'] = Hash::make($request->password);
        }

        $user->save();

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {

    }

    public function updateFcmToken(Request $request)
    {
        $request->validate([
            'token' => 'required|string'
        ]);

        auth()->user()->update([
            'fcm_token' => $request->token
        ]);

        return response()->json(['message' => 'FCM token updated successfully']);
    }
}
