<?php

namespace App\Filament\Resources\DonationProjects\Schemas;

use App\Models\DonationProject;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class DonationProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(1)->components([
            Section::make('প্রকল্প')->columns(2)->schema([
                TextInput::make('title')->label('প্রকল্পের নাম')->required()->maxLength(255),
                TextInput::make('slug')->label('URL (slug)')->unique(ignoreRecord: true)->helperText('ইংরেজিতে। খালি রাখলে স্বয়ংক্রিয়।'),
                Select::make('donation_fund_id')->label('তহবিল')->relationship('fund', 'label')->required()->preload(),
                Select::make('status')->label('বর্তমান অবস্থা')->options(DonationProject::STATUSES)->default('active')->required(),
                Textarea::make('short_description')->label('সংক্ষিপ্ত বিবরণ (কার্ডে)')->required()->maxLength(500)->rows(2)->columnSpanFull(),
                Textarea::make('introduction')->label('প্রকল্প পরিচিতি')->rows(3)->columnSpanFull(),
                Textarea::make('purpose')->label('প্রকল্পের উদ্দেশ্য')->rows(3)->columnSpanFull(),
                Textarea::make('need')->label('কেন এই প্রকল্প প্রয়োজন')->rows(3)->columnSpanFull(),
                Textarea::make('status_note')->label('অবস্থা সম্পর্কে নোট')->rows(2)->columnSpanFull(),
            ]),
            Section::make('লক্ষ্যমাত্রা ও সংগ্রহ')->columns(2)
                ->description('শুধু অনুমোদিত ও যাচাইকৃত অঙ্ক লিখুন। খালি রাখলে সাইটে "তথ্য শীঘ্রই প্রকাশ করা হবে" দেখাবে — কোনো প্রগ্রেস বার দেখাবে না।')
                ->schema([
                    TextInput::make('target_amount')->label('লক্ষ্যমাত্রা (৳)')->numeric()->minValue(0),
                    TextInput::make('collected_amount')->label('সংগৃহীত (৳)')->numeric()->minValue(0)
                        ->lte('target_amount')->validationMessages(['lte' => 'সংগৃহীত অঙ্ক লক্ষ্যমাত্রার বেশি হতে পারে না।']),
                ]),
            Section::make('ছবি ও ভিডিও')->columns(2)->collapsible()->schema([
                FileUpload::make('image')->label('প্রধান ছবি')->image()->disk('public')->directory('donations')->maxSize(4096)->imageEditor(),
                FileUpload::make('gallery')->label('গ্যালারি')->image()->multiple()->reorderable()->disk('public')->directory('donations')->maxSize(4096)->maxFiles(12),
                Repeater::make('videos')->label('ভিডিও লিংক')->columnSpanFull()->defaultItems(0)->columns(2)->schema([
                    TextInput::make('title')->label('শিরোনাম')->required(),
                    TextInput::make('url')->label('লিংক (YouTube/Facebook)')->url()->required(),
                ]),
            ]),
            Section::make('প্রদর্শন')->columns(2)->schema([
                Toggle::make('is_published')->label('সাইটে দেখান')->default(true),
                TextInput::make('sort_order')->label('ক্রম')->numeric()->default(0),
            ]),
        ]);
    }
}
