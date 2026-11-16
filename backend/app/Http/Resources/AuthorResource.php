<?php

namespace App\Http\Resources;

use App\Support\MediaUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Author */
class AuthorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'photo' => MediaUrl::image($this->photo, $this->name),
            'designation' => (string) $this->designation,
            'bio' => (string) $this->bio,
            'qualifications' => $this->qualifications,
        ];
    }
}
