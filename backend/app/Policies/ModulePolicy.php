<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Maps Laravel/Filament abilities onto "{module}.{action}" permissions.
 * Subclasses set $module. Super Admin is allowed everything via Gate::before.
 */
abstract class ModulePolicy
{
    protected string $module;

    protected function allows(User $user, string $action): bool
    {
        return $user->canSignIn() && $user->can("{$this->module}.{$action}");
    }

    public function viewAny(User $user): bool
    {
        return $this->allows($user, 'view');
    }

    public function view(User $user, Model $model): bool
    {
        return $this->allows($user, 'view');
    }

    public function create(User $user): bool
    {
        return $this->allows($user, 'create');
    }

    public function update(User $user, Model $model): bool
    {
        return $this->allows($user, 'edit');
    }

    public function delete(User $user, Model $model): bool
    {
        return $this->allows($user, 'delete');
    }

    public function deleteAny(User $user): bool
    {
        return $this->allows($user, 'delete');
    }

    public function restore(User $user, Model $model): bool
    {
        return $this->allows($user, 'delete');
    }

    public function restoreAny(User $user): bool
    {
        return $this->allows($user, 'delete');
    }

    public function forceDelete(User $user, Model $model): bool
    {
        return false; // permanent deletion only via Super Admin (Gate::before)
    }

    public function forceDeleteAny(User $user): bool
    {
        return false;
    }

    public function reorder(User $user): bool
    {
        return $this->allows($user, 'edit');
    }
}
