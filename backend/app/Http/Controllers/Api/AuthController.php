<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /** Login with email OR member ID. Issues a Sanctum bearer token. */
    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'login' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string'],
            'remember' => ['sometimes', 'boolean'],
            'device' => ['sometimes', 'string', 'max:100'],
        ]);

        $user = User::where('email', $data['login'])->orWhere('member_id', $data['login'])->first();

        // Same message for unknown user and wrong password (no account enumeration)
        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages(['login' => 'আইডি/ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।']);
        }
        if (! $user->is_approved) {
            throw ValidationException::withMessages(['login' => 'আপনার অ্যাকাউন্ট এখনো অ্যাডমিনের অনুমোদনের অপেক্ষায়।']);
        }
        if (! $user->is_active) {
            throw ValidationException::withMessages(['login' => 'আপনার অ্যাকাউন্ট সাময়িকভাবে নিষ্ক্রিয় করা হয়েছে।']);
        }

        $user->forceFill(['last_login_at' => now()])->save();
        $expires = ($data['remember'] ?? false) ? now()->addDays(30) : now()->addHours(12);
        $token = $user->createToken($data['device'] ?? 'member-portal', ['*'], $expires);

        return response()->json([
            'token' => $token->plainTextToken,
            'expiresAt' => $expires->toIso8601String(),
            'user' => new UserResource($user),
        ]);
    }

    public function me(Request $request): UserResource
    {
        return new UserResource($request->user());
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json(['message' => 'লগআউট সম্পন্ন হয়েছে।']);
    }
}
