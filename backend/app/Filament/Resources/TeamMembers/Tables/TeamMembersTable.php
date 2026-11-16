<?php

namespace App\Filament\Resources\TeamMembers\Tables;

use App\Models\TeamMember;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class TeamMembersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->reorderable('sort_order')->defaultSort('sort_order')
            ->columns([
                ImageColumn::make('photo')->label('')->disk('public')->circular(),
                TextColumn::make('name')->label('নাম')->placeholder('— নাম শীঘ্রই —')->searchable(),
                TextColumn::make('designation')->label('পদবি'),
                TextColumn::make('department')->label('বিভাগ')->formatStateUsing(fn ($state) => TeamMember::DEPARTMENTS[$state] ?? $state)->badge()->color('gray'),
                ToggleColumn::make('show_on_home')->label('হোমপেজে'),
                ToggleColumn::make('is_active')->label('সক্রিয়'),
            ])
            ->filters([SelectFilter::make('department')->label('বিভাগ')->options(TeamMember::DEPARTMENTS)])
            ->recordActions([EditAction::make(), DeleteAction::make()]);
    }
}
