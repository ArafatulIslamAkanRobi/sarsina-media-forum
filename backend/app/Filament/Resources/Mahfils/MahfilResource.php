<?php

namespace App\Filament\Resources\Mahfils;

use App\Filament\Resources\Mahfils\Pages\CreateMahfil;
use App\Filament\Resources\Mahfils\Pages\EditMahfil;
use App\Filament\Resources\Mahfils\Pages\ListMahfils;
use App\Filament\Resources\Mahfils\Schemas\MahfilForm;
use App\Filament\Resources\Mahfils\Tables\MahfilsTable;
use App\Models\Mahfil;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class MahfilResource extends Resource
{
    protected static ?string $model = Mahfil::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCalendarDays;


    public static function getModelLabel(): string
    {
        return 'মাহফিল';
    }

    public static function getPluralModelLabel(): string
    {
        return 'মাহফিল';
    }

    public static function getNavigationGroup(): ?string
    {
        return 'কনটেন্ট';
    }

    public static function getNavigationSort(): ?int
    {
        return 4;
    }

    public static function form(Schema $schema): Schema
    {
        return MahfilForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MahfilsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListMahfils::route('/'),
            'create' => CreateMahfil::route('/create'),
            'edit' => EditMahfil::route('/{record}/edit'),
        ];
    }
}
