<?php

namespace App\Http\Resources;

use App\Support\MediaUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\DonationProject */
class DonationProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'fundId' => $this->fund?->key,
            'title' => $this->title,
            'shortDescription' => $this->short_description,
            'introduction' => (string) $this->introduction,
            'purpose' => (string) $this->purpose,
            'need' => (string) $this->need,
            'status' => $this->status,
            'statusNote' => $this->status_note,
            'image' => MediaUrl::image($this->image, $this->title),
            'gallery' => collect($this->gallery ?? [])->map(fn ($p) => MediaUrl::image($p, $this->title))->filter()->values(),
            'videos' => array_values($this->videos ?? []),
            // Never invent figures: null unless an admin entered approved numbers
            'targetAmount' => $this->target_amount !== null ? (float) $this->target_amount : null,
            'collectedAmount' => $this->collected_amount !== null ? (float) $this->collected_amount : null,
            'updates' => $this->whenLoaded('updates', fn () => $this->updates->map(fn ($u) => ['date' => $u->date->toDateString(), 'text' => $u->text])->values(), []),
        ];
    }
}
