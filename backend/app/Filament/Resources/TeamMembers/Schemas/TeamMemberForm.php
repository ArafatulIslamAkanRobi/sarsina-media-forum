<?php

namespace App\Filament\Resources\TeamMembers\Schemas;

use App\Models\TeamMember;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TeamMemberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(1)->components([
            Section::make('সদস্য')->columns(2)->schema([
                TextInput::make('name')->label('পূর্ণ নাম')->helperText('খালি রাখলে কার্ডে "নাম শীঘ্রই যুক্ত হবে" দেখাবে।'),
                TextInput::make('designation')->label('পদবি / দায়িত্ব')->required(),
                Select::make('department')->label('বিভাগ')->options(TeamMember::DEPARTMENTS)->default('other')->required(),
                TextInput::make('slug')->label('প্রোফাইল URL')->unique(ignoreRecord: true)->helperText('নাম থাকলে স্বয়ংক্রিয়ভাবে তৈরি হবে।'),
                FileUpload::make('photo')->label('প্রোফাইল ছবি')->image()->avatar()->disk('public')->directory('team')->maxSize(2048)->imageEditor(),
                Select::make('user_id')->label('লগইন অ্যাকাউন্ট (ঐচ্ছিক)')->relationship('user', 'name')->searchable()->preload(),
                Textarea::make('bio')->label('সংক্ষিপ্ত পরিচিতি')->rows(4)->columnSpanFull(),
                TagsInput::make('responsibilities')->label('দায়িত্বসমূহ')->placeholder('লিখে Enter চাপুন')->columnSpanFull(),
                Repeater::make('social')->label('অনুমোদিত সোশ্যাল লিংক')->columnSpanFull()->defaultItems(0)->columns(2)->schema([
                    TextInput::make('label')->label('নাম')->required(),
                    TextInput::make('url')->label('লিংক')->url()->required(),
                ]),
            ]),
            Section::make('প্রদর্শন')->columns(3)->schema([
                Toggle::make('show_on_home')->label('হোমপেজে দেখান (সর্বোচ্চ ৫ জন)'),
                Toggle::make('is_active')->label('সক্রিয়')->default(true),
                TextInput::make('sort_order')->label('ক্রম')->numeric()->default(0),
            ]),
        ]);
    }
}
