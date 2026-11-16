<?php

namespace App\Filament\Resources\Articles\Pages;

use App\Filament\Resources\Articles\ArticleResource;
use Filament\Resources\Pages\CreateRecord;

class CreateArticle extends CreateRecord
{
    /** Writers without edit rights always publish under their own author profile. */
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (empty($data['author_id'])) {
            $user = auth()->user();
            $data['author_id'] = \App\Models\Author::firstOrCreate(['user_id' => $user->id], ['name' => $user->name])->id;
        }

        return $data;
    }

    protected static string $resource = ArticleResource::class;
}
