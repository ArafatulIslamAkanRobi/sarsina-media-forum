<?php

namespace Tests\Feature;

use App\Enums\PublishStatus;
use App\Models\Article;
use App\Models\News;
use App\Models\User;

class ReviewWorkflowTest extends PortalTestCase
{
    private function newsPayload(array $extra = []): array
    {
        return ['title' => 'মাহফিল সংবাদ', 'category' => 'মাহফিল', 'body' => 'বিস্তারিত', ...$extra];
    }

    public function test_reporter_submission_is_pending_even_if_published_is_requested(): void
    {
        $reporter = User::factory()->withRole('news_reporter')->create();
        $this->actingAs($reporter, 'sanctum')->postJson('/api/v1/member/news', $this->newsPayload(['status' => 'published']))
            ->assertUnprocessable(); // API only accepts draft|pending

        $this->actingAs($reporter, 'sanctum')->postJson('/api/v1/member/news', $this->newsPayload())->assertCreated()
            ->assertJsonPath('data.status', 'pending');

        $news = News::firstOrFail();
        $this->assertSame($reporter->id, $news->submitted_by);
        $this->assertSame($reporter->name, $news->reporter_name);
    }

    public function test_model_level_guard_blocks_publishing_without_permission(): void
    {
        $reporter = User::factory()->withRole('news_reporter')->create();
        $this->actingAs($reporter);

        $n = News::create($this->newsPayload(['status' => PublishStatus::Published, 'is_featured' => true]));
        $this->assertSame(PublishStatus::Pending, $n->fresh()->status);
        $this->assertFalse($n->fresh()->is_featured);
        $this->assertNull($n->fresh()->published_at);
    }

    public function test_editor_publishes_and_is_recorded_as_reviewer(): void
    {
        $editor = User::factory()->withRole('news_editor')->create();
        $n = News::create($this->newsPayload(['status' => PublishStatus::Pending]));

        $this->actingAs($editor);
        $n->update(['status' => PublishStatus::Published]);

        $n->refresh();
        $this->assertSame(PublishStatus::Published, $n->status);
        $this->assertSame($editor->id, $n->reviewed_by);
        $this->assertNotNull($n->published_at);
    }

    public function test_reporter_sees_and_edits_only_own_unpublished_news(): void
    {
        $me = User::factory()->withRole('news_reporter')->create();
        $other = User::factory()->withRole('news_reporter')->create();

        $this->actingAs($other);
        $theirs = News::create($this->newsPayload());
        $this->actingAs($me);
        $mine = News::create($this->newsPayload());
        $published = News::create($this->newsPayload());
        $published->forceFill(['status' => PublishStatus::Published])->saveQuietly();

        $this->assertTrue($me->can('update', $mine));
        $this->assertFalse($me->can('update', $theirs));
        $this->assertFalse($me->can('update', $published->fresh()));
        $this->assertFalse($me->can('view', $theirs));

        $this->actingAs($me, 'sanctum')->getJson('/api/v1/member/news')->assertOk()->assertJsonCount(2, 'data');
    }

    public function test_writer_article_goes_under_own_author_profile(): void
    {
        $writer = User::factory()->withRole('blog_writer')->create(['name' => 'লেখক এক']);
        $this->actingAs($writer, 'sanctum')->postJson('/api/v1/member/articles', $this->newsPayload())
            ->assertCreated()->assertJsonPath('data.author.name', 'লেখক এক')->assertJsonPath('data.status', 'pending');

        $this->assertSame($writer->id, Article::firstOrFail()->author->user_id);
    }

    public function test_roles_cannot_submit_outside_their_module(): void
    {
        $writer = User::factory()->withRole('blog_writer')->create();
        $this->actingAs($writer, 'sanctum')->postJson('/api/v1/member/news', $this->newsPayload())->assertForbidden();

        $member = User::factory()->withRole('member')->create();
        $this->actingAs($member, 'sanctum')->postJson('/api/v1/member/articles', $this->newsPayload())->assertForbidden();
    }
}
