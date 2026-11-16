<?php

namespace App\Filament\Resources\DonationFunds\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class DonationFundForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(2)->components([
            TextInput::make('label')->label('তহবিলের নাম')->required(),
            TextInput::make('key')->label('কী (ইংরেজি)')->required()->alphaDash()->maxLength(32)->unique(ignoreRecord: true)->disabledOn('edit'),
            Toggle::make('is_active')->label('সক্রিয়')->default(true),
            TextInput::make('sort_order')->label('ক্রম')->numeric()->default(0),
        ]);
    }
}
