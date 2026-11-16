<?php

namespace Tests\Feature;

use App\Models\User;

class AuthApiTest extends PortalTestCase
{
    public function test_approved_member_logs_in_with_email_or_member_id(): void
    {
        $u = User::factory()->withRole('news_reporter')->create(['email' => 'r@example.com', 'member_id' => 'SMF-0007']);

        $token = $this->postJson('/api/v1/auth/login', ['login' => 'r@example.com', 'password' => 'password'])
            ->assertOk()->assertJsonPath('user.roles', ['news_reporter'])->json('token');
        $this->postJson('/api/v1/auth/login', ['login' => 'SMF-0007', 'password' => 'password'])->assertOk();

        $this->withToken($token)->getJson('/api/v1/auth/me')->assertOk()
            ->assertJsonPath('data.email', 'r@example.com')
            ->assertJsonFragment(['permissions' => ['news.create', 'news.view', 'profile.edit', 'profile.view']]);
        $this->assertNotNull($u->fresh()->last_login_at);
    }

    public function test_wrong_password_and_unknown_user_get_the_same_message(): void
    {
        User::factory()->create(['email' => 'r@example.com']);
        $a = $this->postJson('/api/v1/auth/login', ['login' => 'r@example.com', 'password' => 'wrong'])->assertUnprocessable()->json('errors.login.0');
        $b = $this->postJson('/api/v1/auth/login', ['login' => 'ghost@example.com', 'password' => 'wrong'])->assertUnprocessable()->json('errors.login.0');
        $this->assertSame($a, $b);
    }

    public function test_unapproved_or_inactive_accounts_cannot_log_in(): void
    {
        User::factory()->unapproved()->create(['email' => 'new@example.com']);
        User::factory()->create(['email' => 'off@example.com', 'is_active' => false]);

        $this->postJson('/api/v1/auth/login', ['login' => 'new@example.com', 'password' => 'password'])
            ->assertUnprocessable()->assertJsonPath('errors.login.0', 'আপনার অ্যাকাউন্ট এখনো অ্যাডমিনের অনুমোদনের অপেক্ষায়।');
        $this->postJson('/api/v1/auth/login', ['login' => 'off@example.com', 'password' => 'password'])->assertUnprocessable();
    }

    public function test_token_stops_working_when_account_is_deactivated(): void
    {
        $u = User::factory()->withRole('member')->create();
        $token = $u->createToken('t')->plainTextToken;
        $this->withToken($token)->getJson('/api/v1/auth/me')->assertOk();

        $u->update(['is_active' => false]);
        $this->app['auth']->forgetGuards();
        $this->withToken($token)->getJson('/api/v1/auth/me')->assertForbidden();
    }

    public function test_login_is_rate_limited(): void
    {
        User::factory()->create(['email' => 'r@example.com']);
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/v1/auth/login', ['login' => 'r@example.com', 'password' => 'bad'])->assertUnprocessable();
        }
        $this->postJson('/api/v1/auth/login', ['login' => 'r@example.com', 'password' => 'bad'])->assertTooManyRequests();
    }

    public function test_logout_revokes_the_token(): void
    {
        $token = User::factory()->withRole('member')->create()->createToken('t')->plainTextToken;
        $this->withToken($token)->postJson('/api/v1/auth/logout')->assertOk();
        $this->app['auth']->forgetGuards();
        $this->withToken($token)->getJson('/api/v1/auth/me')->assertUnauthorized();
    }
}
