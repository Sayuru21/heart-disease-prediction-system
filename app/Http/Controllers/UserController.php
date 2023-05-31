<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function register(Request $req)
    {

//            $validatedData = $req->validate([
//                'name' => 'required|string|max:255',
//                'email' => 'required|email|max:255',
//                'password' => 'required|string|min:6|max:255',
//            ]);

        // Check if email already exists in the database
        $emailExists = User::where('email', $req->email)->exists();

        if ($emailExists) {
            return response()->json([
                'status' => false,
                'message' => 'This email address is already registered.'
            ], 422);
        }

        $user = new User();
        $user->name = $req->name;
        $user->email = $req->email;
        $user->password = $req->password;
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Data Saved Successfully',
            'data' => $user
        ], 201);
    }


    function login(Request $req)
    {

        $emailExists = User::where('email', $req->email)->exists();

        if (!$emailExists) {
            return response()->json([
                'status' => false,
                'message' => 'This email address is not registered.'
            ], 422);
        }

        $user = User::where('email', $req->email)->first();


        if ($user->password != $req->password) {
            return response()->json([
                'status' => false,
                'message' => 'User credentials are incorrect'
            ], 422);
        }
        return response()->json([
            'status' => true,
            'message' => 'Password is correct',
            'data' => $user
        ], 200);
    }
}
