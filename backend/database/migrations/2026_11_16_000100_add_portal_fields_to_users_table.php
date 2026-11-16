<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Media forum member ID, e.g. "SMF-0012" — login accepts this or email
            $table->string('member_id', 32)->nullable()->unique()->after('id');
            $table->string('phone', 32)->nullable()->after('email');
            $table->string('avatar')->nullable();
            // New accounts stay locked until a Super Admin / Admin approves them
            $table->boolean('is_approved')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('last_login_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('approved_by');
            $table->dropUnique(['member_id']);
            $table->dropColumn(['member_id', 'phone', 'avatar', 'is_approved', 'is_active', 'approved_at', 'last_login_at']);
        });
    }
};
