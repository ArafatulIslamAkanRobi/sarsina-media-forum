<?php

namespace App\Support;

/**
 * Single source of truth for roles & permissions (mirrors
 * frontend/src/lib/rbac.ts). Permission names are "{module}.{action}".
 * Run `php artisan db:seed --class=RolesAndPermissionsSeeder` after editing.
 */
final class Rbac
{
    public const MODULES = [
        'site' => 'ওয়েবসাইট সেটিংস ও হোমপেজ',
        'news' => 'সংবাদ',
        'articles' => 'প্রবন্ধ',
        'gallery' => 'গ্যালারি',
        'events' => 'মাহফিল ও ইভেন্ট',
        'donations' => 'অনুদান',
        'team' => 'মিডিয়া টিম',
        'users' => 'সদস্য অ্যাকাউন্ট',
        'profile' => 'নিজস্ব প্রোফাইল',
    ];

    public const ACTIONS = ['view', 'create', 'edit', 'delete', 'publish', 'approve', 'export'];

    /** @return array<string, array{label: string, description: string, grants: array<string, list<string>>}> */
    public static function roles(): array
    {
        $all = self::ACTIONS;
        $own = ['view', 'edit'];

        return [
            'super_admin' => ['label' => 'সুপার অ্যাডমিন', 'description' => 'সম্পূর্ণ ওয়েবসাইট নিয়ন্ত্রণ',
                'grants' => array_fill_keys(array_keys(self::MODULES), $all)],
            'admin' => ['label' => 'অ্যাডমিন', 'description' => 'অনুমোদিত ওয়েবসাইট ব্যবস্থাপনা', 'grants' => [
                'site' => ['view', 'edit'],
                'news' => ['view', 'create', 'edit', 'publish', 'approve'],
                'articles' => ['view', 'create', 'edit', 'publish', 'approve'],
                'gallery' => ['view', 'create', 'edit'],
                'events' => ['view', 'create', 'edit', 'publish'],
                'donations' => ['view'],
                'team' => ['view', 'edit'],
                'users' => ['view', 'edit', 'approve'],
                'profile' => $own,
            ]],
            'news_editor' => ['label' => 'সংবাদ সম্পাদক', 'description' => 'সংবাদ সম্পাদনা ও প্রকাশ', 'grants' => [
                'news' => ['view', 'create', 'edit', 'publish', 'approve'], 'profile' => $own]],
            'news_reporter' => ['label' => 'সংবাদ প্রতিনিধি', 'description' => 'সংবাদ জমা দেওয়া', 'grants' => [
                'news' => ['view', 'create'], 'profile' => $own]],
            'blog_writer' => ['label' => 'ব্লগ লেখক', 'description' => 'প্রবন্ধ লেখা ও জমা দেওয়া', 'grants' => [
                'articles' => ['view', 'create'], 'profile' => $own]],
            'blog_editor' => ['label' => 'ব্লগ সম্পাদক', 'description' => 'প্রবন্ধ সম্পাদনা ও প্রকাশ', 'grants' => [
                'articles' => ['view', 'create', 'edit', 'publish', 'approve'], 'profile' => $own]],
            'gallery_manager' => ['label' => 'গ্যালারি ম্যানেজার', 'description' => 'ছবি ও ভিডিও ব্যবস্থাপনা', 'grants' => [
                'gallery' => ['view', 'create', 'edit', 'delete'], 'profile' => $own]],
            'event_manager' => ['label' => 'ইভেন্ট ম্যানেজার', 'description' => 'মাহফিল ও ইভেন্ট ব্যবস্থাপনা', 'grants' => [
                'events' => ['view', 'create', 'edit', 'publish'], 'profile' => $own]],
            'donation_manager' => ['label' => 'ডোনেশন ম্যানেজার', 'description' => 'অনুদান প্রকল্প ব্যবস্থাপনা', 'grants' => [
                'donations' => ['view', 'create', 'edit', 'export'], 'profile' => $own]],
            'member' => ['label' => 'সদস্য', 'description' => 'নিজস্ব প্রোফাইল ও নির্ধারিত কাজ', 'grants' => [
                'profile' => $own]],
        ];
    }

    /** @return list<string> */
    public static function allPermissions(): array
    {
        $out = [];
        foreach (array_keys(self::MODULES) as $m) {
            foreach (self::ACTIONS as $a) {
                $out[] = "{$m}.{$a}";
            }
        }

        return $out;
    }

    /** @return array<string, string> role name => Bengali label */
    public static function roleOptions(): array
    {
        return array_map(fn ($r) => $r['label'], self::roles());
    }
}
