<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/** Rejects tokens of users who were deactivated or un-approved after login. */
class EnsureMemberIsActive
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if ($user && ! $user->canSignIn()) {
            $user->currentAccessToken()?->delete();

            return response()->json(['message' => 'অ্যাকাউন্টটি সক্রিয় নয়।'], 403);
        }

        return $next($request);
    }
}
