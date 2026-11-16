<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'eyebrow', 'title', 'text', 'primary_label', 'primary_url', 'secondary_label', 'secondary_url',
        'image', 'image_alt', 'video', 'is_active', 'sort_order',
    ];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }
}
