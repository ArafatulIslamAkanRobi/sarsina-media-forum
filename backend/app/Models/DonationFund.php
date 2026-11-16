<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DonationFund extends Model
{
    protected $fillable = ['key', 'label', 'is_active', 'sort_order'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function projects(): HasMany
    {
        return $this->hasMany(DonationProject::class);
    }

    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class);
    }
}
