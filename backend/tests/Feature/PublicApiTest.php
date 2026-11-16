<?php

namespace Tests\Feature;

use App\Enums\PublishStatus;
use App\Models\Article;
use App\Models\Author;
use App\Models\News;

class PublicApiTest extends PortalTestCase
{
    public function test_site_endpoint_exposes_settings_layout_and_disabled_payment_methods(): void
    {
        $res = $this->getJson('/api/v1/site')->assertOk();

        $res->assertJsonPath('data.settings.name', 'ছারছীনা দরবার শরীফ')
            ->assertJsonCount(13, 'data.homepageSections')
            ->assertJsonCount(5, 'data.donationFunds')
            ->assertJsonCount(4, 'data.organizations');

        foreach ($res->json('data.paymentMethods') as $m) {
            $this->assertFalse($m['enabled'], "{$m['id']} must stay disabled until a gateway is integrated");
        }
    }

    public function test_donation_projects_never_report_invented_amounts(): void
    {
        $res = $this->getJson('/api/v1/donation-projects')->assertOk()->assertJsonCount(4, 'data');
        foreach ($res->json('data') as $p) {
            $this->assertNull($p['targetAmount']);
            $this->assertNull($p['collectedAmount']);
        }
        $this->getJson('/api/v1/donation-projects/lillah-boarding')->assertOk()->assertJsonPath('data.fundId', 'lillah');
    }

    public function test_only_published_news_is_public(): void
    {
        News::create(['title' => 'Published', 'slug' => 'pub', 'category' => 'মাহফিল', 'body' => "এক\n\nদুই", 'status' => PublishStatus::Published]);
        News::create(['title' => 'Pending', 'slug' => 'pen', 'category' => 'মাহফিল', 'body' => 'x', 'status' => PublishStatus::Pending]);
        News::create(['title' => 'Scheduled', 'slug' => 'sch', 'category' => 'মাহফিল', 'body' => 'x', 'status' => PublishStatus::Published, 'published_at' => now()->addDay()]);

        $this->getJson('/api/v1/news')->assertOk()->assertJsonCount(1, 'data')->assertJsonPath('data.0.slug', 'pub');
        $this->getJson('/api/v1/news/pub')->assertOk()->assertJsonPath('data.body', ['এক', 'দুই']);
        $this->getJson('/api/v1/news/pen')->assertNotFound();
        $this->getJson('/api/v1/news/sch')->assertNotFound();
    }

    public function test_article_body_is_split_into_sections_with_reading_time(): void
    {
        $author = Author::create(['name' => 'সম্পাদকীয় ডেস্ক', 'slug' => 'desk']);
        Article::create([
            'title' => 'প্রবন্ধ', 'slug' => 'a1', 'category' => 'শিক্ষা', 'author_id' => $author->id,
            'status' => PublishStatus::Published,
            'body' => "ভূমিকার লেখা।\n\n## প্রথম অধ্যায়\nপ্রথম অনুচ্ছেদ।\n\nদ্বিতীয় অনুচ্ছেদ।\n\n## দ্বিতীয় অধ্যায়\nশেষ।",
        ]);

        $res = $this->getJson('/api/v1/articles/a1')->assertOk();
        $this->assertSame(['ভূমিকা', 'প্রথম অধ্যায়', 'দ্বিতীয় অধ্যায়'], array_column($res->json('data.sections'), 'heading'));
        $this->assertSame(['প্রথম অনুচ্ছেদ।', 'দ্বিতীয় অনুচ্ছেদ।'], $res->json('data.sections.1.paragraphs'));
        $res->assertJsonPath('data.readingTimeMin', 1)->assertJsonPath('data.author.slug', 'desk');

        $this->getJson('/api/v1/authors/desk')->assertOk()->assertJsonCount(1, 'data.articles');
    }

    public function test_team_slots_without_names_have_no_profile(): void
    {
        $res = $this->getJson('/api/v1/team')->assertOk()->assertJsonCount(5, 'data');
        $this->assertNull($res->json('data.0.name'));
        $this->assertNull($res->json('data.0.slug'));
    }

    public function test_online_donation_is_refused_while_no_gateway_is_connected(): void
    {
        $this->postJson('/api/v1/donations', [])->assertUnprocessable()->assertJsonValidationErrors(['fund', 'contact', 'amount']);
        $this->postJson('/api/v1/donations', ['fund' => 'lillah', 'contact' => 'not-valid', 'amount' => 5])
            ->assertUnprocessable()->assertJsonValidationErrors(['contact', 'amount']);

        $this->postJson('/api/v1/donations', ['fund' => 'lillah', 'contact' => '01712345678', 'amount' => 1000])
            ->assertStatus(503)->assertJsonPath('code', 'payment_unavailable');
        $this->assertDatabaseCount('donations', 0);
    }

    public function test_newsletter_signup_is_idempotent(): void
    {
        $this->postJson('/api/v1/newsletter', ['email' => 'Reader@Example.com'])->assertStatus(202);
        $this->postJson('/api/v1/newsletter', ['email' => 'reader@example.com'])->assertStatus(202);
        $this->assertDatabaseCount('newsletter_subscribers', 1);
        $this->postJson('/api/v1/newsletter', ['email' => 'nope'])->assertUnprocessable();
    }
}
