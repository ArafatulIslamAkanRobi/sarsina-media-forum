<?php

namespace App\Filament\Resources\Mahfils\Tables;

use App\Models\Mahfil;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class MahfilsTable
{
    public static function configure(Table $table): Table
    {
        return $table->defaultSort('sort_order')
            ->columns([
                TextColumn::make('title')->label('শিরোনাম')->searchable(),
                TextColumn::make('kind')->label('ধরন')->badge()->formatStateUsing(fn ($state) => Mahfil::KINDS[$state] ?? $state),
                TextColumn::make('start_date')->label('তারিখ')->date('d M Y')->placeholder(fn (Mahfil $r) => $r->month_label ?? '—')->sortable(),
                TextColumn::make('venue')->label('স্থান')->limit(30)->toggleable(),
                ToggleColumn::make('is_featured')->label('আজকের'),
                ToggleColumn::make('is_published')->label('প্রকাশিত'),
            ])
            ->filters([SelectFilter::make('kind')->label('ধরন')->options(Mahfil::KINDS)])
            ->recordActions([EditAction::make()]);
    }
}
