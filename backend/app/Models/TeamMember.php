<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeamMember extends Model
{
    use HasSlug;

    protected $fillable = [
        'slug', 'name', 'designation', 'department', 'photo', 'bio', 'responsibilities', 'social',
        'show_on_home', 'is_active', 'sort_order', 'user_id',
    ];

    protected function casts(): array
    {
        return [
            'responsibilities' => 'array',
            'social' => 'array',
            'show_on_home' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public const DEPARTMENTS = [
        'leadership' => 'পরিচালনা ও উপদেষ্টা পরিষদ',
        'editorial' => 'সম্পাদকীয় বিভাগ',
        'news' => 'সংবাদ বিভাগ',
        'video' => 'ভিডিও ও ফটোগ্রাফি বিভাগ',
        'design' => 'গ্রাফিক ডিজাইন বিভাগ',
        'tech' => 'ওয়েব ও প্রযুক্তি বিভাগ',
        'other' => 'অন্যান্য সদস্য',
    ];

    /** Placeholder slots (no name yet) don't get a slug / profile page. */
    protected function slugRequired(): bool
    {
        return filled($this->name);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
