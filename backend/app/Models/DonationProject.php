<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DonationProject extends Model
{
    use HasSlug;

    protected $fillable = [
        'slug', 'donation_fund_id', 'title', 'short_description', 'introduction', 'purpose', 'need',
        'status', 'status_note', 'image', 'gallery', 'videos', 'target_amount', 'collected_amount',
        'is_published', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'gallery' => 'array',
            'videos' => 'array',
            'target_amount' => 'decimal:2',
            'collected_amount' => 'decimal:2',
            'is_published' => 'boolean',
        ];
    }

    public const STATUSES = ['active' => 'চলমান', 'completed' => 'সম্পন্ন', 'paused' => 'সাময়িক স্থগিত'];

    public function fund(): BelongsTo
    {
        return $this->belongsTo(DonationFund::class, 'donation_fund_id');
    }

    public function updates(): HasMany
    {
        return $this->hasMany(DonationProjectUpdate::class)->orderByDesc('date');
    }

    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class);
    }
}
