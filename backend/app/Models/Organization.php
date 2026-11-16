<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasSlug;

    protected $fillable = ['slug', 'name', 'short_name', 'description', 'logo', 'sort_order'];
}
