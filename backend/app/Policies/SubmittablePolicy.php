<?php

namespace App\Policies;

use App\Enums\PublishStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

/**
 * For news & articles: writers/reporters (create only) may edit or delete
 * their OWN unpublished submissions; editors (edit) may edit anything.
 */
abstract class SubmittablePolicy extends ModulePolicy
{
    protected function isOwnUnpublished(User $user, Model $model): bool
    {
        return (int) $model->submitted_by === (int) $user->id
            && $model->status !== PublishStatus::Published;
    }

    public function view(User $user, Model $model): bool
    {
        return $this->allows($user, 'edit') || ($this->allows($user, 'view') && (int) $model->submitted_by === (int) $user->id);
    }

    public function update(User $user, Model $model): bool
    {
        return $this->allows($user, 'edit') || ($this->allows($user, 'create') && $this->isOwnUnpublished($user, $model));
    }

    public function delete(User $user, Model $model): bool
    {
        return $this->allows($user, 'delete') || ($this->allows($user, 'create') && $this->isOwnUnpublished($user, $model));
    }

    public function publish(User $user): bool
    {
        return $this->allows($user, 'publish');
    }
}
