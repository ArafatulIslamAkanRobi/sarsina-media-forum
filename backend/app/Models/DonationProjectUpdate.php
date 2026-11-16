<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DonationProjectUpdate extends Model
{
    protected $fillable = ['donation_project_id', 'date', 'text'];

    protected function casts(): array
    {
        return ['date' => 'date'];
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(DonationProject::class, 'donation_project_id');
    }
}
