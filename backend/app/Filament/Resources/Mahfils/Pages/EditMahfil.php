<?php

namespace App\Filament\Resources\Mahfils\Pages;

use App\Filament\Resources\Mahfils\MahfilResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditMahfil extends EditRecord
{
    protected static string $resource = MahfilResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
