<?php

namespace App\Filament\Resources\Organizations\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class OrganizationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(2)->components([
            TextInput::make('name')->label('সংগঠনের নাম')->required(),
            TextInput::make('slug')->label('URL (slug)')->unique(ignoreRecord: true),
            TextInput::make('short_name')->label('সংক্ষিপ্ত নাম'),
            TextInput::make('sort_order')->label('ক্রম')->numeric()->default(0),
            Textarea::make('description')->label('বিবরণ')->rows(3)->columnSpanFull(),
            FileUpload::make('logo')->label('ছবি / লোগো')->image()->disk('public')->directory('organizations')->maxSize(4096),
        ]);
    }
}
