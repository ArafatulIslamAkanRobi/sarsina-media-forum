<?php

namespace Database\Seeders;

use App\Models\DonationFund;
use App\Models\DonationProject;
use App\Models\HeroSlide;
use App\Models\HomepageSection;
use App\Models\Institution;
use App\Models\Mahfil;
use App\Models\Organization;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;

/**
 * Structural, verified-or-neutral content only: settings, funds, projects
 * (without amounts), institutions, organizations, annual mahfils, homepage
 * layout and five empty team slots. No news/articles are seeded — the
 * frontend keeps its own sample content until real items are published.
 */
class SiteContentSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'site_name' => 'ছারছীনা দরবার শরীফ',
            'media_name' => 'ছারছীনা মিডিয়া ফোরাম',
            'tagline' => 'ছারছীনা দরবার শরীফের কেন্দ্রীয় অনলাইন প্রচার মাধ্যম',
            'description' => 'ছারছীনা দরবার শরীফের পরিচিতি, শিক্ষা কার্যক্রম, সংবাদ, মাহফিল, প্রকাশনী, ইসলামিক প্রবন্ধ, দান কার্যক্রম ও সংগঠনসমূহের অফিসিয়াল ডিজিটাল প্ল্যাটফর্ম।',
            'address' => 'ছারছীনা দরবার শরীফ, নেছারাবাদ, পিরোজপুর', // TODO: verify
            'preview_mode' => '1',
        ];
        foreach ($settings as $key => $value) {
            SiteSetting::firstOrCreate(['key' => $key], ['value' => $value]);
        }

        $sections = [
            'hero' => 'হিরো ব্যানার', 'quickAccess' => 'দ্রুত প্রবেশ', 'todayMahfil' => 'আজকের মাহফিল',
            'latestNews' => 'সর্বশেষ সংবাদ', 'annualMahfil' => 'বাৎসরিক মাহফিল', 'donationBanner' => 'দান ব্যানার',
            'donationProjects' => 'অনুদান প্রকল্প', 'education' => 'শিক্ষা প্রতিষ্ঠান', 'organizations' => 'সংগঠনসমূহ',
            'publications' => 'প্রকাশনী', 'articles' => 'ইসলামিক প্রবন্ধ', 'team' => 'মিডিয়া ফোরাম টিম', 'newsletter' => 'নিউজলেটার',
        ];
        $i = 1;
        foreach ($sections as $key => $label) {
            HomepageSection::firstOrCreate(['key' => $key], ['label' => $label, 'is_visible' => true, 'sort_order' => $i++]);
        }

        if (HeroSlide::count() === 0) {
            $slides = [
                ['স্বাগতম', 'ছারছীনা দরবার শরীফ', 'দ্বীনের খেদমত, শিক্ষা প্রসার ও মানবকল্যাণে নিয়োজিত এক ঐতিহ্যবাহী ইসলামী কেন্দ্র।', 'আমাদের সম্পর্কে জানুন', '/about'],
                ['শিক্ষা', 'কুরআন-সুন্নাহভিত্তিক শিক্ষা', 'দারুস্সুন্নাত কামিল মাদরাসা ও দ্বীনিয়া মাদরাসা বোর্ডের মাধ্যমে আদর্শ আলেম ও নাগরিক তৈরির প্রয়াস।', 'শিক্ষা কার্যক্রম দেখুন', '/education'],
                ['মাহফিল', 'বাৎসরিক মাহফিলসমূহ', 'অগ্রহায়ণ, মাঘ, ফাল্গুন ও মুহররমের মাহফিলের সময়সূচি ও বিস্তারিত তথ্য এক জায়গায়।', 'মাহফিলের তথ্য দেখুন', '/mahfil'],
            ];
            foreach ($slides as $n => [$eyebrow, $title, $text, $label, $url]) {
                HeroSlide::create(['eyebrow' => $eyebrow, 'title' => $title, 'text' => $text, 'primary_label' => $label, 'primary_url' => $url,
                    'secondary_label' => 'দান করুন', 'secondary_url' => '/donate', 'sort_order' => $n + 1]);
            }
        }

        $funds = ['mosque' => 'মসজিদ নির্মাণ', 'minaret' => 'মিনার নির্মাণ', 'lillah' => 'লিল্লাহ বোর্ডিং', 'general' => 'সাধারণ ফান্ড', 'welfare' => 'জনকল্যাণমূলক কার্যক্রম'];
        $i = 1;
        foreach ($funds as $key => $label) {
            DonationFund::firstOrCreate(['key' => $key], ['label' => $label, 'sort_order' => $i++]);
        }

        $projects = [
            ['mosque-construction', 'mosque', 'মসজিদ নির্মাণ', 'দরবার শরীফের জামে মসজিদ নির্মাণ ও সম্প্রসারণে আপনার সহযোগিতা কাম্য।'],
            ['minaret-construction', 'minaret', 'মিনার নির্মাণ', 'দরবার শরীফের ঐতিহ্যবাহী মিনার নির্মাণ কাজে অংশ নিন, স্থায়ী সদকায়ে জারিয়ার সুযোগ।'],
            ['lillah-boarding', 'lillah', 'লিল্লাহ বোর্ডিং', 'এতিম ও অসহায় শিক্ষার্থীদের আবাসন, খাদ্য ও সার্বিক ব্যবস্থাপনায় সহযোগিতা করুন।'],
            ['public-welfare', 'welfare', 'জনকল্যাণমূলক কার্যক্রম', 'ত্রাণ, শীতবস্ত্র বিতরণসহ বিভিন্ন মানবিক ও সেবামূলক কার্যক্রমে অংশীদার হোন।'],
        ];
        foreach ($projects as $n => [$slug, $fund, $title, $desc]) {
            DonationProject::firstOrCreate(['slug' => $slug], [
                'donation_fund_id' => DonationFund::where('key', $fund)->value('id'),
                'title' => $title, 'short_description' => $desc, 'sort_order' => $n + 1,
                // target/collected intentionally NULL until approved figures exist
            ]);
        }

        foreach ([
            ['darussunnat', 'ছারছীনা দারুস্সুন্নাত কামিল মাদরাসা', 'কামিল মাদরাসা', 'কুরআন-সুন্নাহভিত্তিক উচ্চতর দ্বীনি শিক্ষার ঐতিহ্যবাহী প্রতিষ্ঠান।'],
            ['alia', 'আলিয়া বিভাগ', 'শিক্ষা বিভাগ', 'আলিয়া ধারার পাঠক্রমে দ্বীনি ও সাধারণ শিক্ষার সমন্বিত কার্যক্রম।'],
            ['board', 'বাংলাদেশ দ্বীনিয়া মাদরাসা বোর্ড', 'শিক্ষা বোর্ড', 'দেশব্যাপী নিবন্ধিত দ্বীনিয়া মাদরাসাসমূহের পাঠক্রম ও পরীক্ষা পরিচালনা।'],
        ] as $n => [$slug, $name, $kind, $desc]) {
            Institution::firstOrCreate(['slug' => $slug], ['name' => $name, 'kind' => $kind, 'description' => $desc, 'sort_order' => $n + 1]);
        }

        foreach ([
            ['jamiyate', 'বাংলাদেশ জমিয়াতে হিযবুল্লাহ', 'জমিয়াতে হিযবুল্লাহ', 'দরবার শরীফের আদর্শে পরিচালিত কেন্দ্রীয় দ্বীনি সংগঠন।'],
            ['chhatra', 'বাংলাদেশ ছাত্র হিযবুল্লাহ', 'ছাত্র হিযবুল্লাহ', 'ছাত্রদের মাঝে দ্বীনি শিক্ষা, আদব ও নৈতিকতা চর্চার সংগঠন।'],
            ['jubo', 'বাংলাদেশ যুব হিযবুল্লাহ', 'যুব হিযবুল্লাহ', 'যুবসমাজকে দ্বীনের খেদমত ও সমাজসেবায় সম্পৃক্ত করার সংগঠন।'],
            ['aimmaye', 'বাংলাদেশ আইম্মায়ে হিযবুল্লাহ', 'আইম্মায়ে হিযবুল্লাহ', 'মসজিদের ইমাম ও খতিবদের সমন্বয়ে গঠিত সংগঠন।'],
        ] as $n => [$slug, $name, $short, $desc]) {
            Organization::firstOrCreate(['slug' => $slug], ['name' => $name, 'short_name' => $short, 'description' => $desc, 'sort_order' => $n + 1]);
        }

        foreach ([
            ['agrahayan', 'অগ্রহায়ণের মাহফিল', 'অগ্রহায়ণ মাস', 'autumn'],
            ['magh', 'মাঘের মাহফিল', 'মাঘ মাস', 'winter'],
            ['falgun', 'ফাল্গুনের মাহফিল', 'ফাল্গুন মাস', 'spring'],
            ['muharram', 'মুহররমের মাহফিল', 'মুহররম মাস', 'night'],
        ] as $n => [$slug, $title, $month, $theme]) {
            Mahfil::firstOrCreate(['slug' => $slug], [
                'title' => $title, 'kind' => 'annual', 'month_label' => $month, 'venue' => 'ছারছীনা দরবার শরীফ', 'theme' => $theme,
                'description' => "{$month}ে অনুষ্ঠিত বাৎসরিক মাহফিল। তারিখ ঘোষণার পর এখানে প্রকাশ করা হবে।", 'sort_order' => $n + 1,
            ]);
        }

        if (TeamMember::count() === 0) {
            foreach ([['সমন্বয়ক', 'leadership'], ['সংবাদ সম্পাদক', 'editorial'], ['সংবাদ প্রতিনিধি', 'news'], ['ভিডিও ও ভিজ্যুয়াল', 'video'], ['ডিজিটাল মিডিয়া', 'tech']] as $n => [$role, $dept]) {
                TeamMember::create(['designation' => $role, 'department' => $dept, 'show_on_home' => true, 'sort_order' => $n + 1]);
            }
        }
    }
}
