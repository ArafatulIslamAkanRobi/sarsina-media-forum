<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    protected $fillable = [
        'member_id', 'name', 'email', 'phone', 'avatar', 'password', 'is_approved', 'is_active',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'approved_at' => 'datetime',
            'last_login_at' => 'datetime',
            'is_approved' => 'boolean',
            'is_active' => 'boolean',
            'password' => 'hashed',
        ];
    }

    /** Approved, active accounts only. */
    public function canSignIn(): bool
    {
        return $this->is_approved && $this->is_active;
    }

    /**
     * The admin panel is for anyone with at least one content permission —
     * a plain "member" (profile only) uses the member portal instead.
     */
    public function canAccessPanel(Panel $panel): bool
    {
        if (! $this->canSignIn()) {
            return false;
        }

        return $this->getAllPermissions()->contains(fn ($p) => ! str_starts_with($p->name, 'profile.'));
    }
}
