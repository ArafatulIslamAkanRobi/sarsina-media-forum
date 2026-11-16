<?php

namespace App\Models\Concerns;

use Illuminate\Support\Str;

/**
 * Fills `slug` from `title`/`name` when left empty. Bengali titles often
 * transliterate to nothing, so a short random slug is used as a fallback —
 * editors can always type an English slug in the admin panel.
 */
trait HasSlug
{
    protected static function bootHasSlug(): void
    {
        static::saving(function ($model) {
            if (filled($model->slug)) {
                $model->slug = Str::slug($model->slug);

                return;
            }
            $source = $model->title ?? $model->name ?? null;
            if ($source === null && ! $model->slugRequired()) {
                return;
            }
            $base = Str::slug((string) $source) ?: Str::lower(Str::random(8));
            $slug = $base;
            $i = 2;
            while (static::withoutGlobalScopes()->where('slug', $slug)->whereKeyNot($model->getKey())->exists()) {
                $slug = "{$base}-{$i}";
                $i++;
            }
            $model->slug = $slug;
        });
    }

    protected function slugRequired(): bool
    {
        return true;
    }
}
