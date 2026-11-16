<?php

return [
    /*
     | Online payment methods that are really integrated (merchant account +
     | server-side verification). Keep empty until a gateway is live — the
     | public API then refuses online donations instead of faking them.
     | Example: DONATION_METHODS=bkash,nagad
     */
    'enabled_methods' => array_values(array_filter(explode(',', (string) env('DONATION_METHODS', '')))),

    'min_amount' => 10,

    'preset_amounts' => [500, 1000, 2000, 5000, 10000],

    'method_labels' => [
        'bkash' => 'বিকাশ',
        'nagad' => 'নগদ',
        'bank' => 'ব্যাংক ট্রান্সফার',
        'card' => 'ডেবিট / ক্রেডিট কার্ড',
    ],
];
