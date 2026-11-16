<?php

namespace App\Models;

use App\Enums\DonationStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Donation extends Model
{
    protected $fillable = [
        'donation_fund_id', 'donation_project_id', 'donor_name', 'is_anonymous', 'contact', 'amount',
        'method', 'status', 'gateway_reference', 'note', 'paid_at', 'refunded_at', 'recorded_by',
    ];

    protected function casts(): array
    {
        return [
            'status' => DonationStatus::class,
            'amount' => 'decimal:2',
            'is_anonymous' => 'boolean',
            'paid_at' => 'datetime',
            'refunded_at' => 'datetime',
        ];
    }

    public const METHODS = ['cash' => 'নগদ (হাতে)', 'bkash' => 'বিকাশ', 'nagad' => 'নগদ (মোবাইল)', 'bank' => 'ব্যাংক', 'card' => 'কার্ড', 'other' => 'অন্যান্য'];

    protected static function booted(): void
    {
        static::creating(function (Donation $d) {
            // Receipt number: SDF-YYYYMMDD-XXXXXX (unique, not guessable)
            $d->transaction_id ??= 'SDF-'.now()->format('Ymd').'-'.Str::upper(Str::random(6));
        });
    }

    public function fund(): BelongsTo
    {
        return $this->belongsTo(DonationFund::class, 'donation_fund_id');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(DonationProject::class, 'donation_project_id');
    }

    public function recorder(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}
