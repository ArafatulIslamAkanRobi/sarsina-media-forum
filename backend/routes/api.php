<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FormController;
use App\Http\Controllers\Api\MemberContentController;
use App\Http\Controllers\Api\PublicController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->name('api.')->group(function () {
    // ---- Public website (read-only)
    Route::get('site', [PublicController::class, 'site'])->name('site');
    Route::get('news', [PublicController::class, 'newsIndex'])->name('news.index');
    Route::get('news/{slug}', [PublicController::class, 'newsShow'])->name('news.show');
    Route::get('articles', [PublicController::class, 'articlesIndex'])->name('articles.index');
    Route::get('articles/{slug}', [PublicController::class, 'articleShow'])->name('articles.show');
    Route::get('authors/{slug}', [PublicController::class, 'authorShow'])->name('authors.show');
    Route::get('mahfils', [PublicController::class, 'mahfils'])->name('mahfils');
    Route::get('donation-projects', [PublicController::class, 'donationProjects'])->name('donation-projects.index');
    Route::get('donation-projects/{slug}', [PublicController::class, 'donationProject'])->name('donation-projects.show');
    Route::get('team', [PublicController::class, 'team'])->name('team.index');
    Route::get('team/{slug}', [PublicController::class, 'teamMember'])->name('team.show');

    // ---- Public forms
    Route::middleware('throttle:public-forms')->group(function () {
        Route::post('newsletter', [FormController::class, 'newsletter'])->name('newsletter');
        Route::post('donations', [FormController::class, 'donate'])->name('donations.store');
    });

    // ---- Member portal auth
    Route::post('auth/login', [AuthController::class, 'login'])->middleware('throttle:login')->name('auth.login');

    Route::middleware(['auth:sanctum', 'member.active'])->group(function () {
        Route::get('auth/me', [AuthController::class, 'me'])->name('auth.me');
        Route::post('auth/logout', [AuthController::class, 'logout'])->name('auth.logout');

        Route::prefix('member')->name('member.')->group(function () {
            Route::get('news', [MemberContentController::class, 'myNews'])->name('news.index');
            Route::post('news', [MemberContentController::class, 'storeNews'])->name('news.store');
            Route::get('articles', [MemberContentController::class, 'myArticles'])->name('articles.index');
            Route::post('articles', [MemberContentController::class, 'storeArticle'])->name('articles.store');
        });
    });
});
