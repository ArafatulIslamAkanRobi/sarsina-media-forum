<?php

namespace App\Http\Controllers\Api;

use App\Enums\PublishStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\NewsResource;
use App\Models\Article;
use App\Models\Author;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\Rule;

/**
 * Member portal: reporters submit news, writers submit articles. New items
 * are "pending" until an editor publishes them (see HasReviewWorkflow).
 */
class MemberContentController extends Controller
{
    private function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'category' => ['required', 'string', 'max:64'],
            'body' => ['required', 'string', 'max:100000'],
            'cover' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'status' => ['sometimes', Rule::in(['draft', 'pending'])],
        ];
    }

    public function myNews(Request $request): AnonymousResourceCollection
    {
        $this->authorize('viewAny', News::class);

        return NewsResource::collection(News::where('submitted_by', $request->user()->id)->latest()->paginate(20));
    }

    public function storeNews(Request $request): NewsResource
    {
        $this->authorize('create', News::class);
        $data = $request->validate($this->rules());

        $news = new News(collect($data)->except('cover')->all());
        $news->status = PublishStatus::from($data['status'] ?? 'pending');
        $news->reporter_name = $request->user()->name;
        if ($request->hasFile('cover')) {
            $news->cover_image = $request->file('cover')->store('news', 'public');
        }
        $news->save();

        return new NewsResource($news);
    }

    public function myArticles(Request $request): AnonymousResourceCollection
    {
        $this->authorize('viewAny', Article::class);

        return ArticleResource::collection(Article::with('author')->where('submitted_by', $request->user()->id)->latest()->paginate(20));
    }

    public function storeArticle(Request $request): ArticleResource
    {
        $this->authorize('create', Article::class);
        $data = $request->validate($this->rules());
        $user = $request->user();

        // Each writer publishes under their own author profile
        $author = Author::firstOrCreate(['user_id' => $user->id], ['name' => $user->name]);

        $article = new Article(collect($data)->except('cover')->all());
        $article->author_id = $author->id;
        $article->status = PublishStatus::from($data['status'] ?? 'pending');
        if ($request->hasFile('cover')) {
            $article->cover_image = $request->file('cover')->store('articles', 'public');
        }
        $article->save();

        return new ArticleResource($article->load('author'));
    }
}
