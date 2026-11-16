<?php

namespace App\Filament\Resources\SiteSettings\Tables;

use App\Models\SiteSetting;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class SiteSettingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('key')->label('সেটিং')->formatStateUsing(fn ($state) => SiteSetting::KEYS[$state] ?? $state),
                TextColumn::make('value')->label('মান')->limit(80)->placeholder('—'),
            ])
            ->recordActions([EditAction::make()]);
    }
}
