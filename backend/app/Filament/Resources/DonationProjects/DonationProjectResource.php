<?php

namespace App\Filament\Resources\DonationProjects;

use App\Filament\Resources\DonationProjects\Pages\CreateDonationProject;
use App\Filament\Resources\DonationProjects\Pages\EditDonationProject;
use App\Filament\Resources\DonationProjects\Pages\ListDonationProjects;
use App\Filament\Resources\DonationProjects\Schemas\DonationProjectForm;
use App\Filament\Resources\DonationProjects\Tables\DonationProjectsTable;
use App\Models\DonationProject;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class DonationProjectResource extends Resource
{
    protected static ?string $model = DonationProject::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedHeart;


    public static function getModelLabel(): string
    {
        return 'অনুদান প্রকল্প';
    }

    public static function getPluralModelLabel(): string
    {
        return 'অনুদান প্রকল্প';
    }

    public static function getNavigationGroup(): ?string
    {
        return 'অনুদান';
    }

    public static function getNavigationSort(): ?int
    {
        return 1;
    }

    public static function form(Schema $schema): Schema
    {
        return DonationProjectForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DonationProjectsTable::configure($table);
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
            'index' => ListDonationProjects::route('/'),
            'create' => CreateDonationProject::route('/create'),
            'edit' => EditDonationProject::route('/{record}/edit'),
        ];
    }
}
