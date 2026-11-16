<?php

namespace App\Filament\Resources\DonationFunds;

use App\Filament\Resources\DonationFunds\Pages\CreateDonationFund;
use App\Filament\Resources\DonationFunds\Pages\EditDonationFund;
use App\Filament\Resources\DonationFunds\Pages\ListDonationFunds;
use App\Filament\Resources\DonationFunds\Schemas\DonationFundForm;
use App\Filament\Resources\DonationFunds\Tables\DonationFundsTable;
use App\Models\DonationFund;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class DonationFundResource extends Resource
{
    protected static ?string $model = DonationFund::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedWallet;


    public static function getModelLabel(): string
    {
        return 'তহবিল';
    }

    public static function getPluralModelLabel(): string
    {
        return 'তহবিল';
    }

    public static function getNavigationGroup(): ?string
    {
        return 'অনুদান';
    }

    public static function getNavigationSort(): ?int
    {
        return 3;
    }

    public static function form(Schema $schema): Schema
    {
        return DonationFundForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DonationFundsTable::configure($table);
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
            'index' => ListDonationFunds::route('/'),
            'create' => CreateDonationFund::route('/create'),
            'edit' => EditDonationFund::route('/{record}/edit'),
        ];
    }
}
