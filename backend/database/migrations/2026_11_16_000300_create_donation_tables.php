<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donation_funds', function (Blueprint $table) {
            $table->id();
            $table->string('key', 32)->unique(); // e.g. mosque, minaret, lillah
            $table->string('label');
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('donation_projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->foreignId('donation_fund_id')->constrained()->restrictOnDelete();
            $table->string('title');
            $table->string('short_description', 500);
            $table->text('introduction')->nullable();
            $table->text('purpose')->nullable();
            $table->text('need')->nullable();
            // active | completed | paused
            $table->string('status', 16)->default('active');
            $table->text('status_note')->nullable();
            $table->string('image')->nullable();
            $table->json('gallery')->nullable();
            $table->json('videos')->nullable();
            // Published only when approved figures exist. NULL = "coming soon" on the site.
            $table->decimal('target_amount', 14, 2)->nullable();
            $table->decimal('collected_amount', 14, 2)->nullable();
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('donation_project_updates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('donation_project_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->text('text');
            $table->timestamps();
        });

        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id', 40)->unique(); // our own receipt number
            $table->foreignId('donation_fund_id')->constrained()->restrictOnDelete();
            $table->foreignId('donation_project_id')->nullable()->constrained()->nullOnDelete();
            $table->string('donor_name')->nullable();
            $table->boolean('is_anonymous')->default(false);
            $table->string('contact')->nullable(); // mobile or email
            $table->decimal('amount', 14, 2);
            // cash | bkash | nagad | bank | card | other
            $table->string('method', 16)->default('cash');
            // pending | paid | failed | refunded
            $table->string('status', 16)->default('pending');
            $table->string('gateway_reference')->nullable();
            $table->text('note')->nullable();
            $table->foreignId('recorded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('refunded_at')->nullable();
            $table->timestamps();
            $table->index(['status', 'donation_fund_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
        Schema::dropIfExists('donation_project_updates');
        Schema::dropIfExists('donation_projects');
        Schema::dropIfExists('donation_funds');
    }
};
