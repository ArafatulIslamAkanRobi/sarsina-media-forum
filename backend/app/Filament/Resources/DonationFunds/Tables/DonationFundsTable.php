<?php

namespace App\Filament\Resources\DonationFunds\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class DonationFundsTable
{
    public static function configure(Table $table): Table
    {
        return $table->reorderable('sort_order')->defaultSort('sort_order')->columns([
            TextColumn::make('label')->label('তহবিল'),
            TextColumn::make('key')->label('কী')->fontFamily('mono')->color('gray'),
            TextColumn::make('donations_sum_amount')->label('মোট পরিশোধিত')->sum(['donations' => fn ($q) => $q->where('status', 'paid')], 'amount')->money('BDT'),
            ToggleColumn::make('is_active')->label('সক্রিয়'),
        ])->recordActions([EditAction::make()]);
    }
}
