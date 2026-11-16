<?php

namespace App\Http\Resources;

use App\Support\MediaUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Mahfil */
class MahfilResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'kind' => $this->kind,
            'monthLabel' => $this->month_label,
            'startDate' => $this->start_date?->toDateString(),
            'time' => $this->time,
            'venue' => $this->venue,
            'description' => (string) $this->description,
            'bannerImage' => MediaUrl::image($this->banner_image, $this->title),
            'theme' => $this->theme,
        ];
    }
}
