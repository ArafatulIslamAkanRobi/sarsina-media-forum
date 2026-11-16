<?php

namespace App\Filament\Resources\HomepageSections\Tables;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

/** Drag rows to change the homepage order; toggle to show / hide. */
class HomepageSectionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->reorderable('sort_order')->defaultSort('sort_order')->paginated(false)
            ->description('সারি টেনে হোমপেজের ক্রম পরিবর্তন করুন; টগল করে দেখান/লুকান।')
            ->columns([
                TextColumn::make('sort_order')->label('#'),
                TextColumn::make('label')->label('সেকশন'),
                TextColumn::make('key')->label('কী')->fontFamily('mono')->color('gray'),
                ToggleColumn::make('is_visible')->label('দৃশ্যমান'),
            ]);
    }
}
