<?php

namespace App\Models\Concerns;

use App\Enums\PublishStatus;
use Illuminate\Database\Eloquent\Builder;

trait Publishable
{
    protected static function bootPublishable(): void
    {
        static::saving(function ($model) {
            if ($model->status === PublishStatus::Published && $model->published_at === null) {
                $model->published_at = now();
            }
        });
    }

    /** Published and not scheduled in the future. */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', PublishStatus::Published)
            ->where(fn (Builder $q) => $q->whereNull('published_at')->orWhere('published_at', '<=', now()));
    }
}
