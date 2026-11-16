<?php

namespace App\Filament\Resources\Institutions\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class InstitutionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(2)->components([
            TextInput::make('name')->label('শিক্ষা প্রতিষ্ঠানের নাম')->required(),
            TextInput::make('slug')->label('URL (slug)')->unique(ignoreRecord: true),
            TextInput::make('kind')->label('ধরন'),
            TextInput::make('sort_order')->label('ক্রম')->numeric()->default(0),
            Textarea::make('description')->label('বিবরণ')->rows(3)->columnSpanFull(),
            FileUpload::make('image')->label('ছবি / লোগো')->image()->disk('public')->directory('institutions')->maxSize(4096),
        ]);
    }
}
