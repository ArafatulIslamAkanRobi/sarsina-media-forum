<?php

namespace App\Http\Resources;

use App\Support\MediaUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\TeamMember */
class TeamMemberResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'designation' => $this->designation,
            'department' => $this->department,
            'photo' => MediaUrl::image($this->photo, $this->name),
            'bio' => $this->bio,
            'responsibilities' => array_values($this->responsibilities ?? []),
            'social' => array_values($this->social ?? []),
            'showOnHome' => $this->show_on_home,
            'order' => $this->sort_order,
        ];
    }
}
