<?php

namespace App\Filament\Resources\DonationProjects\Tables;

use App\Models\DonationProject;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class DonationProjectsTable
{
    public static function configure(Table $table): Table
    {
        return $table->reorderable('sort_order')->defaultSort('sort_order')->columns([
            ImageColumn::make('image')->label('')->disk('public'),
            TextColumn::make('title')->label('প্রকল্প')->searchable(),
            TextColumn::make('fund.label')->label('তহবিল')->badge()->color('gray'),
            TextColumn::make('status')->label('অবস্থা')->formatStateUsing(fn ($state) => DonationProject::STATUSES[$state] ?? $state)->badge(),
            TextColumn::make('target_amount')->label('লক্ষ্য')->money('BDT')->placeholder('প্রকাশিত নয়'),
            TextColumn::make('collected_amount')->label('সংগৃহীত')->money('BDT')->placeholder('প্রকাশিত নয়'),
            ToggleColumn::make('is_published')->label('প্রকাশিত'),
        ])->recordActions([EditAction::make()]);
    }
}
