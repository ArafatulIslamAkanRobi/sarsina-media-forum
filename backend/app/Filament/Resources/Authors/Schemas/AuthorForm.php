<?php

namespace App\Filament\Resources\Authors\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class AuthorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(2)->components([
            TextInput::make('name')->label('নাম')->required(),
            TextInput::make('slug')->label('প্রোফাইল URL')->unique(ignoreRecord: true),
            TextInput::make('designation')->label('পরিচয় / পদবি'),
            Select::make('user_id')->label('লগইন অ্যাকাউন্ট')->relationship('user', 'name')->searchable()->preload(),
            FileUpload::make('photo')->label('ছবি')->image()->avatar()->disk('public')->directory('authors')->maxSize(2048),
            Textarea::make('bio')->label('সংক্ষিপ্ত পরিচিতি')->rows(4)->columnSpanFull(),
            Textarea::make('qualifications')->label('শিক্ষাগত / পেশাগত পরিচয়')->rows(2)->columnSpanFull()
                ->helperText('শুধু যাচাইকৃত তথ্য লিখুন।'),
        ]);
    }
}
