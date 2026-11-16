<?php

namespace App\Models;

use App\Enums\PublishStatus;
use App\Models\Concerns\HasReviewWorkflow;
use App\Models\Concerns\HasSlug;
use App\Models\Concerns\Publishable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasReviewWorkflow, HasSlug, Publishable, SoftDeletes;

    public static function permissionModule(): string
    {
        return 'articles';
    }

    protected $fillable = [
        'slug', 'title', 'excerpt', 'category', 'author_id', 'body', 'cover_image', 'cover_alt',
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

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function submitter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }

    /**
     * Split the body into sections on "## Heading" lines. Text before the
     * first heading becomes an untitled introduction.
     *
     * @return list<array{id: string, heading: string, paragraphs: list<string>}>
     */
    public function sections(): array
    {
        $sections = [];
        $current = ['heading' => '', 'lines' => []];
        foreach (preg_split('/\R/u', (string) $this->body) as $line) {
            if (preg_match('/^##\s+(.+)$/u', trim($line), $m)) {
                $sections[] = $current;
                $current = ['heading' => trim($m[1]), 'lines' => []];
            } else {
                $current['lines'][] = $line;
            }
        }
        $sections[] = $current;

        $out = [];
        foreach ($sections as $i => $s) {
            $paragraphs = array_values(array_filter(array_map('trim', preg_split('/\n\s*\n/u', implode("\n", $s['lines'])))));
            if ($s['heading'] === '' && $paragraphs === []) {
                continue;
            }
            $out[] = [
                'id' => 's'.($i + 1),
                'heading' => $s['heading'] !== '' ? $s['heading'] : 'ভূমিকা',
                'paragraphs' => $paragraphs,
            ];
        }

        return $out;
    }

    /** ~200 words/minute, minimum 1. */
    public function readingTimeMinutes(): int
    {
        $words = count(preg_split('/\s+/u', trim(strip_tags((string) $this->body)), -1, PREG_SPLIT_NO_EMPTY));

        return max(1, (int) ceil($words / 200));
    }

    public function plainExcerpt(): string
    {
        return $this->excerpt ?: Str::limit(strip_tags((string) $this->body), 180);
    }
}
