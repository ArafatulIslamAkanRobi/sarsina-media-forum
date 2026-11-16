<?php

namespace App\Filament\Support;

use App\Enums\PublishStatus;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Illuminate\Support\Facades\Auth;

/** Form sections shared by News and Articles. */
final class EditorialFields
{
    public static function canPublish(string $module): bool
    {
        return (bool) Auth::user()?->can("{$module}.publish");
    }

    public static function main(string $bodyHelp, array $categories): Section
    {
        return Section::make('মূল তথ্য')->columns(2)->schema([
            TextInput::make('title')->label('শিরোনাম')->required()->maxLength(255)->columnSpanFull(),
            TextInput::make('slug')->label('URL (slug)')->maxLength(255)->unique(ignoreRecord: true)
                ->helperText('ইংরেজিতে, যেমন monthly-mahfil-2026। খালি রাখলে স্বয়ংক্রিয়ভাবে তৈরি হবে।'),
            TextInput::make('category')->label('ক্যাটাগরি')->required()->maxLength(64)->datalist($categories),
            Textarea::make('excerpt')->label('সংক্ষিপ্ত বিবরণ')->rows(2)->maxLength(500)->columnSpanFull(),
            Textarea::make('body')->label('মূল লেখা')->required()->rows(16)->helperText($bodyHelp)->columnSpanFull(),
        ]);
    }

    public static function media(string $dir): Section
    {
        return Section::make('প্রচ্ছদ ছবি')->columns(2)->collapsible()->schema([
            FileUpload::make('cover_image')->label('ছবি')->image()->disk('public')->directory($dir)
                ->maxSize(4096)->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])->imageEditor(),
            TextInput::make('cover_alt')->label('ছবির বিবরণ (alt text)')->helperText('দৃষ্টিপ্রতিবন্ধী পাঠক ও SEO-র জন্য।'),
        ]);
    }

    public static function publishing(string $module, array $extra = []): Section
    {
        $publisher = fn () => self::canPublish($module);

        return Section::make('প্রকাশনা')->columns(2)->schema([
            Select::make('status')->label('অবস্থা')->required()->native(false)
                ->options(fn () => $publisher()
                    ? PublishStatus::class
                    : [PublishStatus::Draft->value => PublishStatus::Draft->label(), PublishStatus::Pending->value => PublishStatus::Pending->label()])
                ->default(PublishStatus::Pending->value)
                ->helperText(fn () => $publisher() ? null : 'জমা দেওয়ার পর সম্পাদক পর্যালোচনা করে প্রকাশ করবেন।'),
            DateTimePicker::make('published_at')->label('প্রকাশের সময়')->seconds(false)->visible($publisher)
                ->helperText('ভবিষ্যতের সময় দিলে তখন প্রকাশিত হবে।'),
            Toggle::make('is_featured')->label('ফিচার্ড (হোমপেজে বড় করে)')->visible($publisher),
            ...$extra,
            Textarea::make('review_note')->label('সম্পাদকের মন্তব্য')->rows(2)->columnSpanFull()
                ->disabled(fn () => ! $publisher())->helperText('প্রত্যাখ্যান বা সংশোধনের কারণ লিখুন।'),
        ]);
    }

    public static function seo(): Section
    {
        return Section::make('SEO')->columns(2)->collapsed()->schema([
            TextInput::make('seo_title')->label('SEO শিরোনাম')->maxLength(70),
            Textarea::make('seo_description')->label('মেটা বিবরণ')->rows(2)->maxLength(320),
        ]);
    }
}
