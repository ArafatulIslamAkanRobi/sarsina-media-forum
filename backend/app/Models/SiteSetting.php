<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class SiteSetting extends Model
{
    protected $fillable = ['key', 'value'];

    /** Editable keys and their admin labels. */
    public const KEYS = [
        'site_name' => 'সাইটের নাম',
        'media_name' => 'মিডিয়া ফোরামের নাম',
        'tagline' => 'ট্যাগলাইন',
        'description' => 'সাইটের বিবরণ (SEO)',
        'address' => 'ঠিকানা',
        'phone' => 'ফোন',
        'email' => 'ইমেইল',
        'facebook_url' => 'ফেসবুক লিংক',
        'youtube_url' => 'ইউটিউব লিংক',
        'preview_mode' => 'প্রিভিউ নোটিশ দেখান (1/0)',
    ];

    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget('site_settings'));
        static::deleted(fn () => Cache::forget('site_settings'));
    }

    /** @return array<string, string|null> */
    public static function allCached(): array
    {
        return Cache::rememberForever('site_settings', fn () => static::query()->pluck('value', 'key')->all());
    }
}
