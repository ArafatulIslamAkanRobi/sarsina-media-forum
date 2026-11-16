<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Illuminate\Database\Eloquent\Model;

class Mahfil extends Model
{
    use HasSlug;

    protected $fillable = [
        'slug', 'title', 'kind', 'month_label', 'start_date', 'time', 'venue', 'description',
        'banner_image', 'theme', 'is_featured', 'is_published', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ];
    }

    public const KINDS = ['annual' => 'বাৎসরিক', 'monthly' => 'মাসিক', 'weekly' => 'সাপ্তাহিক', 'special' => 'বিশেষ'];

    public const THEMES = ['autumn' => 'হেমন্ত', 'winter' => 'শীত', 'spring' => 'বসন্ত', 'night' => 'রাত'];
}
