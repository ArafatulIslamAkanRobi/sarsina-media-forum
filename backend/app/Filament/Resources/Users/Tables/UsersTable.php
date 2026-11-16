<?php

namespace App\Filament\Resources\Users\Tables;

use App\Models\User;
use App\Support\Rbac;
use Filament\Actions\Action;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        $labels = Rbac::roleOptions();

        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('name')->label('নাম')->searchable(),
                TextColumn::make('member_id')->label('আইডি')->searchable()->placeholder('—'),
                TextColumn::make('email')->label('ইমেইল')->searchable(),
                TextColumn::make('roles.name')->label('রোল')->badge()->formatStateUsing(fn ($state) => $labels[$state] ?? $state),
                IconColumn::make('is_approved')->label('অনুমোদিত')->boolean(),
                IconColumn::make('is_active')->label('সক্রিয়')->boolean(),
                TextColumn::make('last_login_at')->label('শেষ লগইন')->since()->placeholder('কখনো না'),
            ])
            ->filters([TernaryFilter::make('is_approved')->label('অনুমোদন')])
            ->recordActions([
                Action::make('approve')->label('অনুমোদন দিন')->icon('heroicon-o-check-badge')->color('success')
                    ->visible(fn (User $r) => ! $r->is_approved && Auth::user()?->can('users.approve'))
                    ->requiresConfirmation()
                    ->action(fn (User $r) => $r->forceFill(['is_approved' => true, 'approved_at' => now(), 'approved_by' => Auth::id()])->save()),
                EditAction::make(),
            ]);
    }
}
