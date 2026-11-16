<?php

namespace App\Filament\Widgets;

use App\Enums\DonationStatus;
use App\Enums\PublishStatus;
use App\Models\Article;
use App\Models\Donation;
use App\Models\News;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Auth;

/** Real counts only — each stat is shown to roles allowed to see that module. */
class OverviewStats extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $u = Auth::user();
        $stats = [];

        if ($u->can('news.view')) {
            $own = ! $u->can('news.edit');
            $q = fn () => News::query()->when($own, fn ($q) => $q->where('submitted_by', $u->id));
            $stats[] = Stat::make($own ? 'আমার প্রকাশিত সংবাদ' : 'প্রকাশিত সংবাদ', $q()->where('status', PublishStatus::Published)->count());
            $stats[] = Stat::make('সংবাদ — অনুমোদনের অপেক্ষায়', $q()->where('status', PublishStatus::Pending)->count())->color('warning');
        }
        if ($u->can('articles.view')) {
            $own = ! $u->can('articles.edit');
            $q = fn () => Article::query()->when($own, fn ($q) => $q->where('submitted_by', $u->id));
            $stats[] = Stat::make($own ? 'আমার প্রকাশিত প্রবন্ধ' : 'প্রকাশিত প্রবন্ধ', $q()->where('status', PublishStatus::Published)->count());
            $stats[] = Stat::make('প্রবন্ধ — অনুমোদনের অপেক্ষায়', $q()->where('status', PublishStatus::Pending)->count())->color('warning');
        }
        if ($u->can('donations.view')) {
            $sum = (float) Donation::where('status', DonationStatus::Paid)->sum('amount');
            $stats[] = Stat::make('রেকর্ডকৃত অনুদান (পরিশোধিত)', '৳ '.number_format($sum))->description('শুধু অ্যাডমিনে রেকর্ড করা হিসাব');
        }
        if ($u->can('users.approve')) {
            $stats[] = Stat::make('অনুমোদনের অপেক্ষায় সদস্য', User::where('is_approved', false)->count())->color('warning');
        }

        return $stats;
    }
}
