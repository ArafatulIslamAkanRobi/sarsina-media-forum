<?php

namespace App\Filament\Resources\Mahfils\Pages;

use App\Filament\Resources\Mahfils\MahfilResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListMahfils extends ListRecords
{
    protected static string $resource = MahfilResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
