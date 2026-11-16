<?php

namespace App\Filament\Resources\Articles\Schemas;

use App\Filament\Support\EditorialFields;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class ArticleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(1)->components([
            EditorialFields::main(
                'অনুচ্ছেদের মাঝে ফাঁকা লাইন রাখুন। "## শিরোনাম" লিখলে নতুন অধ্যায় শুরু হবে এবং সূচিপত্রে দেখাবে।',
                ['শিক্ষা', 'আকিদা', 'ফিকহ ও আমল', 'তাসাউফ', 'আদব ও আখলাক', 'ইতিহাস', 'সমসাময়িক'],
            ),
            EditorialFields::media('articles'),
            EditorialFields::publishing('articles', [
                Select::make('author_id')->label('লেখক')->relationship('author', 'name')->searchable()->preload()
                    ->visible(fn () => auth()->user()?->can('articles.edit'))->required(fn () => auth()->user()?->can('articles.edit'))
                    ->createOptionForm([
                        \Filament\Forms\Components\TextInput::make('name')->label('নাম')->required(),
                        \Filament\Forms\Components\TextInput::make('designation')->label('পরিচয়'),
                    ]),
            ]),
            EditorialFields::seo(),
        ]);
    }
}
