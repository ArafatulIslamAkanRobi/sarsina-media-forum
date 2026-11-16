<?php

namespace App\Models;

use App\Enums\PublishStatus;
use App\Models\Concerns\HasReviewWorkflow;
use App\Models\Concerns\HasSlug;
use App\Models\Concerns\Publishable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class News extends Model
{
    use HasReviewWorkflow, HasSlug, Publishable, SoftDeletes;

    public static function permissionModule(): string
    {
        return 'news';
    }

    protected $table = 'news';

    protected $fillable = [
        'slug', 'title', 'excerpt', 'category', 'body', 'cover_image', 'cover_alt', 'reporter_name',
        'status', 'is_featured', 'published_at', 'seo_title', 'seo_description', 'review_note',
    ];

    protected function casts(): array
    {
        return [
            'status' => PublishStatus::class,
            'is_featured' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public function submitter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
