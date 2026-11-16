<?php

namespace App\Http\Resources;

use App\Support\MediaUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Article */
class ArticleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $detail = $request->routeIs('api.articles.show', 'api.member.*');

        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->plainExcerpt(),
            'category' => $this->category,
            'authorSlug' => $this->author?->slug,
            'author' => new AuthorResource($this->whenLoaded('author')),
            'publishedAt' => $this->published_at?->toDateString(),
            'updatedAt' => $this->updated_at?->toDateString(),
            'readingTimeMin' => $this->readingTimeMinutes(),
            'coverImage' => MediaUrl::image($this->cover_image, $this->cover_alt ?: $this->title),
            'featured' => $this->is_featured,
            'sections' => $this->when($detail, fn () => $this->sections()),
            'seo' => ['title' => $this->seo_title, 'description' => $this->seo_description],
            'status' => $this->when($request->routeIs('api.member.*'), fn () => $this->status->value),
            'reviewNote' => $this->when($request->routeIs('api.member.*'), fn () => $this->review_note),
        ];
    }
}
