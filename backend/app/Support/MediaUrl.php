<?php

namespace App\Support;

use Illuminate\Support\Facades\Storage;

final class MediaUrl
{
    /** @return array{src: string, alt: string}|null */
    public static function image(?string $path, ?string $alt = null): ?array
    {
        if (blank($path)) {
            return null;
        }

        return ['src' => self::url($path), 'alt' => (string) ($alt ?? '')];
    }

    public static function url(string $path): string
    {
        return preg_match('#^(https?:)?//#', $path) || str_starts_with($path, '/')
            ? $path
            : Storage::disk('public')->url($path);
    }
}
