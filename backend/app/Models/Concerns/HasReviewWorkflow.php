<?php

namespace App\Models\Concerns;

use App\Enums\PublishStatus;
use Illuminate\Support\Facades\Auth;

/**
 * Server-side publishing rules for submitted content (news, articles):
 *  - the logged-in user is recorded as `submitted_by` on create;
 *  - users without "{module}.publish" can never set status to published —
 *    it is downgraded to "pending" for an editor to review;
 *  - when a publisher publishes/rejects, they are recorded as `reviewed_by`.
 */
trait HasReviewWorkflow
{
    abstract public static function permissionModule(): string;

    protected static function bootHasReviewWorkflow(): void
    {
        static::creating(function ($model) {
            if (Auth::check() && $model->submitted_by === null) {
                $model->submitted_by = Auth::id();
            }
        });

        static::saving(function ($model) {
            $user = Auth::user();
            if (! $user) {
                return; // console / seeders
            }
            $module = static::permissionModule();
            $canPublish = $user->can("{$module}.publish");

            if (! $canPublish && in_array($model->status, [PublishStatus::Published, PublishStatus::Rejected], true) && $model->isDirty('status')) {
                $model->status = PublishStatus::Pending;
            }
            if (! $canPublish && $model->isDirty('is_featured')) {
                $model->is_featured = (bool) $model->getOriginal('is_featured');
            }
            if ($canPublish && $model->isDirty('status') && in_array($model->status, [PublishStatus::Published, PublishStatus::Rejected], true)) {
                $model->reviewed_by = $user->id;
            }
        });
    }
}
