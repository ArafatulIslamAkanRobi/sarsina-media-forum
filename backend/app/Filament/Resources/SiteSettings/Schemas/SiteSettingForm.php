<?php

namespace App\Filament\Resources\SiteSettings\Schemas;

use App\Models\SiteSetting;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class SiteSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('key')->label('সেটিং')->options(SiteSetting::KEYS)->required()->unique(ignoreRecord: true)->disabledOn('edit'),
            Textarea::make('value')->label('মান')->rows(3)->columnSpanFull(),
        ]);
    }
}
