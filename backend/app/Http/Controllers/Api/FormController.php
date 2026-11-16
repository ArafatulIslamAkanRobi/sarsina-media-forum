<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DonationFund;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class FormController extends Controller
{
    public function newsletter(Request $request): JsonResponse
    {
        $data = $request->validate(['email' => ['required', 'email:rfc', 'max:255']]);
        NewsletterSubscriber::firstOrCreate(['email' => strtolower($data['email'])], ['status' => 'pending']);

        // Same response whether new or existing (no address enumeration)
        return response()->json(['message' => 'ধন্যবাদ! আপনার ইমেইল সংরক্ষণ করা হয়েছে।'], 202);
    }

    /**
     * Start an online donation. Until a payment gateway is integrated this
     * validates the input and returns 503 — it never creates a fake
     * transaction. Offline donations are recorded by the Donation Manager
     * in the admin panel.
     */
    public function donate(Request $request): JsonResponse
    {
        $methods = config('donations.enabled_methods');

        $data = $request->validate([
            'fund' => ['required', Rule::exists(DonationFund::class, 'key')->where('is_active', true)],
            'name' => ['nullable', 'string', 'max:120'],
            'anonymous' => ['sometimes', 'boolean'],
            'contact' => ['required', 'string', 'max:255', function ($attr, $value, $fail) {
                $v = preg_replace('/[\s-]/', '', (string) $value);
                if (! preg_match('/^(?:\+?88)?01[3-9]\d{8}$/', $v) && ! filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    $fail('সঠিক মোবাইল নম্বর অথবা ইমেইল লিখুন।');
                }
            }],
            'amount' => ['required', 'numeric', 'min:'.config('donations.min_amount'), 'max:100000000'],
            'method' => $methods ? ['required', Rule::in($methods)] : ['nullable', 'string'],
        ]);

        if ($methods === []) {
            return response()->json([
                'message' => 'অনলাইন পেমেন্ট এখনো সংযুক্ত হয়নি। কোনো লেনদেন সম্পন্ন হয়নি।',
                'code' => 'payment_unavailable',
            ], 503);
        }

        // TODO(payments): create a pending Donation, redirect to the gateway,
        // verify the callback server-side, then mark paid and send the receipt.
        return response()->json(['message' => 'Payment gateway integration pending.', 'code' => 'not_implemented'], 501);
    }
}
