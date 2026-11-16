<?php

namespace App\Filament\Resources\Users\Schemas;

use App\Support\Rbac;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class UserForm
{
    /** Only a Super Admin may grant the Super Admin / Admin roles. */
    public static function assignableRoles(): array
    {
        $labels = Rbac::roleOptions();
        $isSuper = Auth::user()?->hasRole('super_admin');

        return Role::query()->pluck('name', 'id')
            ->reject(fn ($name) => ! $isSuper && in_array($name, ['super_admin', 'admin'], true))
            ->map(fn ($name) => $labels[$name] ?? $name)
            ->all();
    }

    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(1)->components([
            Section::make('অ্যাকাউন্ট')->columns(2)->schema([
                TextInput::make('name')->label('নাম')->required()->maxLength(255),
                TextInput::make('member_id')->label('সদস্য আইডি')->unique(ignoreRecord: true)->maxLength(32)->placeholder('SMF-0001'),
                TextInput::make('email')->label('ইমেইল')->email()->required()->unique(ignoreRecord: true),
                TextInput::make('phone')->label('মোবাইল')->tel(),
                TextInput::make('password')->label('পাসওয়ার্ড')->password()->revealable()
                    ->rule(\Illuminate\Validation\Rules\Password::min(10)->letters()->numbers())
                    ->required(fn (string $operation) => $operation === 'create')
                    ->dehydrated(fn ($state) => filled($state))
                    ->helperText(fn (string $operation) => $operation === 'edit' ? 'পরিবর্তন না করলে খালি রাখুন।' : 'কমপক্ষে ১০ অক্ষর, অক্ষর ও সংখ্যা মিলিয়ে।'),
            ]),
            Section::make('অনুমোদন ও রোল')->columns(2)->schema([
                Toggle::make('is_approved')->label('অনুমোদিত')->helperText('অনুমোদন ছাড়া লগইন করা যাবে না।')
                    ->disabled(fn () => ! Auth::user()?->can('users.approve')),
                Toggle::make('is_active')->label('সক্রিয়')->default(true),
                Select::make('roles')->label('রোল')->multiple()->preload()->columnSpanFull()
                    ->relationship('roles', 'name')
                    ->options(fn () => self::assignableRoles())
                    ->helperText('প্রতিটি রোলের অনুমতি App\\Support\\Rbac-এ নির্ধারিত।'),
            ]),
        ]);
    }
}
