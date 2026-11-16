<?php

namespace App\Filament\Resources\News\Tables;

use App\Enums\PublishStatus;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class NewsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                ImageColumn::make('cover_image')->label('')->disk('public')->square(),
                TextColumn::make('title')->label('শিরোনাম')->searchable()->limit(60)->wrap(),
                TextColumn::make('category')->label('ক্যাটাগরি')->badge()->color('gray'),
                TextColumn::make('status')->label('অবস্থা')->badge(),
                IconColumn::make('is_featured')->label('ফিচার্ড')->boolean(),
                TextColumn::make('submitter.name')->label('জমাদাতা')->toggleable(),
                TextColumn::make('published_at')->label('প্রকাশ')->dateTime('d M Y')->sortable(),
                TextColumn::make('updated_at')->label('হালনাগাদ')->since()->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')->label('অবস্থা')->options(PublishStatus::class),
                TrashedFilter::make(),
            ])
            ->recordActions([EditAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make(), RestoreBulkAction::make()])]);
    }
}
