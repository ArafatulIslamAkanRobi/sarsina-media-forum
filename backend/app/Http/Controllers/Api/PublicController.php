<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\AuthorResource;
use App\Http\Resources\DonationProjectResource;
use App\Http\Resources\MahfilResource;
use App\Http\Resources\NewsResource;
use App\Http\Resources\TeamMemberResource;
use App\Models\Article;
use App\Models\Author;
use App\Models\DonationFund;
use App\Models\DonationProject;
use App\Models\HeroSlide;
use App\Models\HomepageSection;
use App\Models\Institution;
use App\Models\Mahfil;
use App\Models\News;
use App\Models\Organization;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use App\Support\MediaUrl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/** Read-only endpoints for the public website. */
class PublicController extends Controller
{
    public function site(): JsonResponse
    {
        $s = SiteSetting::allCached();
        $methods = config('donations.enabled_methods');

        return response()->json(['data' => [
            'settings' => [
                'name' => $s['site_name'] ?? null,
                'mediaName' => $s['media_name'] ?? null,
                'tagline' => $s['tagline'] ?? null,
                'description' => $s['description'] ?? null,
                'address' => $s['address'] ?? null,
                'phone' => $s['phone'] ?? null,
                'email' => $s['email'] ?? null,
                'social' => array_values(array_filter([
                    filled($s['facebook_url'] ?? null) ? ['id' => 'facebook', 'url' => $s['facebook_url']] : null,
                    filled($s['youtube_url'] ?? null) ? ['id' => 'youtube', 'url' => $s['youtube_url']] : null,
                ])),
                'previewMode' => (bool) ($s['preview_mode'] ?? false),
            ],
            'heroSlides' => HeroSlide::where('is_active', true)->orderBy('sort_order')->get()->map(fn (HeroSlide $h) => [
                'id' => (string) $h->id,
                'eyebrow' => $h->eyebrow,
                'title' => $h->title,
                'text' => (string) $h->text,
                'primary' => $h->primary_url ? ['label' => $h->primary_label, 'href' => $h->primary_url] : null,
                'secondary' => $h->secondary_url ? ['label' => $h->secondary_label, 'href' => $h->secondary_url] : null,
                'image' => MediaUrl::image($h->image, $h->image_alt ?: $h->title),
                'video' => $h->video ? ['src' => MediaUrl::url($h->video), 'poster' => $h->image ? MediaUrl::url($h->image) : null] : null,
            ]),
            'homepageSections' => HomepageSection::orderBy('sort_order')->get()->map(fn ($s) => [
                'id' => $s->key, 'visible' => $s->is_visible, 'order' => $s->sort_order,
            ]),
            'donationFunds' => DonationFund::where('is_active', true)->orderBy('sort_order')->get()->map(fn ($f) => ['id' => $f->key, 'label' => $f->label]),
            'paymentMethods' => collect(config('donations.method_labels'))->map(fn ($label, $id) => [
                'id' => $id, 'label' => $label, 'enabled' => in_array($id, $methods, true),
            ])->values(),
            'presetAmounts' => config('donations.preset_amounts'),
            'institutions' => Institution::orderBy('sort_order')->get()->map(fn ($i) => [
                'slug' => $i->slug, 'name' => $i->name, 'kind' => (string) $i->kind, 'description' => (string) $i->description,
                'image' => MediaUrl::image($i->image, $i->name),
            ]),
            'organizations' => Organization::orderBy('sort_order')->get()->map(fn ($o) => [
                'slug' => $o->slug, 'name' => $o->name, 'shortName' => (string) $o->short_name, 'description' => (string) $o->description,
                'logo' => MediaUrl::image($o->logo, $o->name),
            ]),
        ]]);
    }

    public function newsIndex(Request $request): AnonymousResourceCollection
    {
        $q = News::published()->latest('published_at');
        if ($request->filled('category')) {
            $q->where('category', $request->string('category'));
        }

        return NewsResource::collection($q->paginate(min(50, $request->integer('per_page', 12))));
    }

    public function newsShow(string $slug): NewsResource
    {
        return new NewsResource(News::published()->where('slug', $slug)->firstOrFail());
    }

    public function articlesIndex(Request $request): AnonymousResourceCollection
    {
        $q = Article::published()->with('author')->latest('published_at');
        if ($request->filled('category')) {
            $q->where('category', $request->string('category'));
        }
        if ($request->filled('author')) {
            $q->whereHas('author', fn ($a) => $a->where('slug', $request->string('author')));
        }

        return ArticleResource::collection($q->paginate(min(50, $request->integer('per_page', 12))));
    }

    public function articleShow(string $slug): ArticleResource
    {
        return new ArticleResource(Article::published()->with('author')->where('slug', $slug)->firstOrFail());
    }

    public function authorShow(string $slug): JsonResponse
    {
        $author = Author::where('slug', $slug)->firstOrFail();
        $articles = $author->articles()->published()->with('author')->latest('published_at')->get();

        return response()->json(['data' => [
            'author' => new AuthorResource($author),
            'articles' => ArticleResource::collection($articles),
        ]]);
    }

    public function mahfils(): JsonResponse
    {
        $published = Mahfil::where('is_published', true);

        return response()->json(['data' => [
            'featured' => ($f = (clone $published)->where('is_featured', true)->orderByDesc('start_date')->first()) ? new MahfilResource($f) : null,
            'annual' => MahfilResource::collection((clone $published)->where('kind', 'annual')->orderBy('sort_order')->get()),
            'upcoming' => MahfilResource::collection((clone $published)->where('kind', '!=', 'annual')->whereDate('start_date', '>=', today())->orderBy('start_date')->limit(10)->get()),
        ]]);
    }

    public function donationProjects(): AnonymousResourceCollection
    {
        return DonationProjectResource::collection(
            DonationProject::with('fund')->where('is_published', true)->orderBy('sort_order')->get()
        );
    }

    public function donationProject(string $slug): DonationProjectResource
    {
        return new DonationProjectResource(
            DonationProject::with(['fund', 'updates'])->where('is_published', true)->where('slug', $slug)->firstOrFail()
        );
    }

    public function team(): AnonymousResourceCollection
    {
        return TeamMemberResource::collection(TeamMember::where('is_active', true)->orderBy('sort_order')->get());
    }

    public function teamMember(string $slug): TeamMemberResource
    {
        return new TeamMemberResource(TeamMember::where('is_active', true)->whereNotNull('name')->where('slug', $slug)->firstOrFail());
    }
}
