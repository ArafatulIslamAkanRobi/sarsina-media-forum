<?php

namespace App\Filament\Resources\Donations\Schemas;

use App\Enums\DonationStatus;
use App\Models\Donation;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;

/** Manual donation record (cash / bank / mobile banking received offline). */
class DonationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(1)->components([
            Section::make('অনুদান')->columns(2)->schema([
                TextInput::make('transaction_id')->label('রসিদ নম্বর')->disabled()->dehydrated(false)
                    ->placeholder('সংরক্ষণের পর স্বয়ংক্রিয়ভাবে তৈরি হবে')->visibleOn('edit'),
                Select::make('donation_fund_id')->label('তহবিল')->relationship('fund', 'label')->required()->preload()->live(),
                Select::make('donation_project_id')->label('প্রকল্প (ঐচ্ছিক)')->preload()
                    ->relationship('project', 'title', fn ($query, Get $get) => $get('donation_fund_id') ? $query->where('donation_fund_id', $get('donation_fund_id')) : $query),
                TextInput::make('amount')->label('পরিমাণ (৳)')->numeric()->required()->minValue(1),
                Select::make('method')->label('মাধ্যম')->options(Donation::METHODS)->default('cash')->required(),
                Select::make('status')->label('অবস্থা')->options(DonationStatus::class)->default(DonationStatus::Paid->value)->required(),
                DateTimePicker::make('paid_at')->label('পরিশোধের সময়')->seconds(false)->default(now()),
                TextInput::make('gateway_reference')->label('রেফারেন্স (TrxID / চেক নং)'),
            ]),
            Section::make('দাতা')->columns(2)->schema([
                TextInput::make('donor_name')->label('নাম'),
                TextInput::make('contact')->label('মোবাইল / ইমেইল'),
                Toggle::make('is_anonymous')->label('নাম প্রকাশে অনিচ্ছুক'),
                Textarea::make('note')->label('নোট')->rows(2)->columnSpanFull(),
            ]),
        ]);
    }
}
