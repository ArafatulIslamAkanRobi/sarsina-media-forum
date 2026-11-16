<?php

namespace App\Filament\Resources\NewsletterSubscribers\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class NewsletterSubscribersTable
{
    public static function configure(Table $table): Table
    {
        return $table->defaultSort('created_at', 'desc')->columns([
            TextColumn::make('email')->label('ইমেইল')->searchable()->copyable(),
            TextColumn::make('status')->label('অবস্থা')->badge(),
            TextColumn::make('created_at')->label('তারিখ')->since(),
        ])->recordActions([EditAction::make()]);
    }
}
