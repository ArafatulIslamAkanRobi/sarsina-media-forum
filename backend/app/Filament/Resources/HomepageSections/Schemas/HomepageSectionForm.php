<?php

namespace App\Filament\Resources\HomepageSections\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class HomepageSectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('label')->label('সেকশন')->disabled(),
            Toggle::make('is_visible')->label('হোমপেজে দেখান'),
        ]);
    }
}
