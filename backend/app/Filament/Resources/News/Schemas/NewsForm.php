<?php

namespace App\Filament\Resources\News\Schemas;

use App\Filament\Support\EditorialFields;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class NewsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(1)->components([
            EditorialFields::main('প্রতিটি অনুচ্ছেদের মাঝে একটি ফাঁকা লাইন রাখুন।', ['মাহফিল', 'শিক্ষা', 'সংগঠন', 'উন্নয়ন', 'বিজ্ঞপ্তি']),
            EditorialFields::media('news'),
            EditorialFields::publishing('news', [
                TextInput::make('reporter_name')->label('প্রতিবেদক')->default('নিজস্ব প্রতিবেদক')->required(),
            ]),
            EditorialFields::seo(),
        ]);
    }
}
