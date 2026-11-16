<?php

namespace App\Filament\Resources\HeroSlides\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class HeroSlideForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(1)->components([
            Section::make('লেখা')->columns(2)->schema([
                TextInput::make('eyebrow')->label('উপরের ছোট লেখা'),
                TextInput::make('title')->label('শিরোনাম')->required(),
                Textarea::make('text')->label('বিবরণ')->rows(2)->columnSpanFull(),
                TextInput::make('primary_label')->label('প্রধান বাটনের লেখা'),
                TextInput::make('primary_url')->label('প্রধান বাটনের লিংক')->placeholder('/about'),
                TextInput::make('secondary_label')->label('দ্বিতীয় বাটনের লেখা'),
                TextInput::make('secondary_url')->label('দ্বিতীয় বাটনের লিংক')->placeholder('/donate'),
            ]),
            Section::make('ছবি / ভিডিও')->columns(2)->schema([
                FileUpload::make('image')->label('ছবি (মোবাইলে পোস্টার)')->image()->disk('public')->directory('hero')->maxSize(6144)
                    ->helperText('প্রস্তাবিত: 1920×1080, WebP/JPG।'),
                TextInput::make('image_alt')->label('ছবির বিবরণ (alt)'),
                FileUpload::make('video')->label('ড্রোন ভিডিও (শুধু ডেস্কটপে)')->disk('public')->directory('hero')
                    ->acceptedFileTypes(['video/mp4', 'video/webm'])->maxSize(30720)->helperText('সর্বোচ্চ ৩০ MB; মোবাইলে ছবি দেখাবে।'),
                Toggle::make('is_active')->label('সক্রিয়')->default(true),
                TextInput::make('sort_order')->label('ক্রম')->numeric()->default(0),
            ]),
        ]);
    }
}
