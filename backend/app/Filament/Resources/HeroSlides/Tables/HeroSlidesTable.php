<?php

namespace App\Filament\Resources\HeroSlides\Tables;

use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class HeroSlidesTable
{
    public static function configure(Table $table): Table
    {
        return $table->reorderable('sort_order')->defaultSort('sort_order')->columns([
            ImageColumn::make('image')->label('')->disk('public'),
            TextColumn::make('title')->label('শিরোনাম'),
            TextColumn::make('eyebrow')->label('উপশিরোনাম')->color('gray'),
            ToggleColumn::make('is_active')->label('সক্রিয়'),
        ])->recordActions([EditAction::make(), DeleteAction::make()]);
    }
}
