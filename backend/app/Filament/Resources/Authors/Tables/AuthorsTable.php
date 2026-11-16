<?php

namespace App\Filament\Resources\Authors\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AuthorsTable
{
    public static function configure(Table $table): Table
    {
        return $table->columns([
            ImageColumn::make('photo')->label('')->disk('public')->circular(),
            TextColumn::make('name')->label('নাম')->searchable(),
            TextColumn::make('designation')->label('পরিচয়'),
            TextColumn::make('articles_count')->label('প্রবন্ধ')->counts('articles'),
        ])->recordActions([EditAction::make()]);
    }
}
