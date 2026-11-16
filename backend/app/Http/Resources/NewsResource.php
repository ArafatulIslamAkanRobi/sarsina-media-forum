<?php

namespace App\Http\Resources;

use App\Support\MediaUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\News */
class NewsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => (string) $this->excerpt,
            'category' => $this->category,
            'publishedAt' => $this->published_at?->toDateString(),
            'updatedAt' => $this->updated_at?->toDateString(),
            'reporter' => $this->reporter_name,
            'coverImage' => MediaUrl::image($this->cover_image, $this->cover_alt ?: $this->title),
            'featured' => $this->is_featured,
            'body' => $this->when($request->routeIs('api.news.show', 'api.member.*'), fn () => array_values(array_filter(array_map('trim', preg_split('/\n\s*\n/u', (string) $this->body))))),
            'seo' => ['title' => $this->seo_title, 'description' => $this->seo_description],
            'status' => $this->when($request->routeIs('api.member.*'), fn () => $this->status->value),
            'reviewNote' => $this->when($request->routeIs('api.member.*'), fn () => $this->review_note),
        ];
    }
}
