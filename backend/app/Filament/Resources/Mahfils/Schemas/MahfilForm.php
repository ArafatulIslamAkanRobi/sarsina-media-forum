<?php

namespace App\Filament\Resources\Mahfils\Schemas;

use App\Models\Mahfil;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class MahfilForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(1)->components([
            Section::make('মাহফিল')->columns(2)->schema([
                TextInput::make('title')->label('শিরোনাম')->required(),
                TextInput::make('slug')->label('URL (slug)')->unique(ignoreRecord: true),
                Select::make('kind')->label('ধরন')->options(Mahfil::KINDS)->default('annual')->required(),
                TextInput::make('month_label')->label('মাস (বাৎসরিক হলে)')->placeholder('অগ্রহায়ণ মাস'),
                DatePicker::make('start_date')->label('তারিখ')->helperText('বাৎসরিক মাহফিলের তারিখ ঘোষণা না হলে খালি রাখুন।'),
                TextInput::make('time')->label('সময়')->placeholder('বাদ আসর'),
                TextInput::make('venue')->label('স্থান')->required()->default('ছারছীনা দরবার শরীফ')->columnSpanFull(),
                Textarea::make('description')->label('বিবরণ')->rows(3)->columnSpanFull(),
            ]),
            Section::make('প্রদর্শন')->columns(2)->schema([
                FileUpload::make('banner_image')->label('ব্যানার ছবি')->image()->disk('public')->directory('mahfil')->maxSize(4096),
                Select::make('theme')->label('কার্ডের ডিজাইন (ছবি না থাকলে)')->options(Mahfil::THEMES),
                Toggle::make('is_featured')->label('"আজকের মাহফিল" হিসেবে দেখান'),
                Toggle::make('is_published')->label('প্রকাশিত')->default(true),
                TextInput::make('sort_order')->label('ক্রম')->numeric()->default(0),
            ]),
        ]);
    }
}
