<?php

namespace App\Filament\Resources\NewsletterSubscribers\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class NewsletterSubscriberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('email')->label('ইমেইল')->email()->required()->unique(ignoreRecord: true),
            Select::make('status')->label('অবস্থা')->options(['pending' => 'অপেক্ষমাণ', 'subscribed' => 'সাবস্ক্রাইবড', 'unsubscribed' => 'আনসাবস্ক্রাইবড'])->required(),
        ]);
    }
}
