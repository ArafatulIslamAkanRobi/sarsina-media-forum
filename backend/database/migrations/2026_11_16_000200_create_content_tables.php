<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Editorial content: news, authors, articles, mahfils.
 * Status values are documented here and enforced by PHP enums in app/Enums.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('excerpt')->nullable();
            $table->string('category', 64);
            $table->longText('body');
            $table->string('cover_image')->nullable();
            $table->string('cover_alt')->nullable();
            $table->string('reporter_name')->default('নিজস্ব প্রতিবেদক');
            // draft | pending | published | rejected
            $table->string('status', 16)->default('draft');
            $table->boolean('is_featured')->default(false);
            $table->foreignId('submitted_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('review_note')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->string('seo_title')->nullable();
            $table->string('seo_description', 320)->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['status', 'published_at']);
        });

        Schema::create('authors', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('photo')->nullable();
            $table->string('designation')->nullable();
            $table->text('bio')->nullable();
            // Only verified qualifications — leave empty otherwise
            $table->text('qualifications')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('excerpt')->nullable();
            $table->string('category', 64);
            $table->foreignId('author_id')->constrained()->restrictOnDelete();
            // Plain text; "## " lines become section headings + table of contents
            $table->longText('body');
            $table->string('cover_image')->nullable();
            $table->string('cover_alt')->nullable();
            $table->string('status', 16)->default('draft');
            $table->boolean('is_featured')->default(false);
            $table->foreignId('submitted_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('review_note')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->string('seo_title')->nullable();
            $table->string('seo_description', 320)->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['status', 'published_at']);
            $table->index('category');
        });

        Schema::create('mahfils', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            // annual | monthly | weekly | special
            $table->string('kind', 16)->default('annual');
            $table->string('month_label')->nullable();
            $table->date('start_date')->nullable();
            $table->string('time')->nullable();
            $table->string('venue');
            $table->text('description')->nullable();
            $table->string('banner_image')->nullable();
            // autumn | winter | spring | night — decorative card artwork
            $table->string('theme', 16)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->index(['kind', 'start_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mahfils');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('authors');
        Schema::dropIfExists('news');
    }
};
