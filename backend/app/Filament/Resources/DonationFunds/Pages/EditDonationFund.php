<?php

namespace App\Filament\Resources\DonationFunds\Pages;

use App\Filament\Resources\DonationFunds\DonationFundResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditDonationFund extends EditRecord
{
    protected static string $resource = DonationFundResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
