<?php

namespace Tests\Feature;

use App\Models\User;

class AdminPanelTest extends PortalTestCase
{
    public function test_super_admin_can_open_every_admin_list_page(): void
    {
        $admin = User::factory()->withRole('super_admin')->create();
        $pages = ['news', 'articles', 'authors', 'mahfils', 'donation-projects', 'donations', 'donation-funds',
            'hero-slides', 'homepage-sections', 'team-members', 'institutions', 'organizations', 'site-settings',
            'newsletter-subscribers', 'users'];

        $this->actingAs($admin)->get('/admin')->assertOk();
        foreach ($pages as $p) {
            $this->actingAs($admin)->get("/admin/{$p}")->assertOk();
        }
        $this->actingAs($admin)->get('/admin/news/create')->assertOk();
        $this->actingAs($admin)->get('/admin/donation-projects/1/edit')->assertOk();
    }

    public function test_panel_access_follows_roles(): void
    {
        $reporter = User::factory()->withRole('news_reporter')->create();
        $this->actingAs($reporter)->get('/admin/news')->assertOk();
        $this->actingAs($reporter)->get('/admin/donations')->assertForbidden();
        $this->actingAs($reporter)->get('/admin/users')->assertForbidden();

        $donation = User::factory()->withRole('donation_manager')->create();
        $this->actingAs($donation)->get('/admin/donations')->assertOk();
        $this->actingAs($donation)->get('/admin/news')->assertForbidden();
    }

    public function test_plain_members_and_unapproved_staff_cannot_enter_the_panel(): void
    {
        $this->actingAs(User::factory()->withRole('member')->create())->get('/admin')->assertForbidden();
        $this->actingAs(User::factory()->unapproved()->withRole('news_editor')->create())->get('/admin')->assertForbidden();
    }
}
