<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    use HasSlug;

    protected $fillable = ['slug', 'name', 'kind', 'description', 'image', 'sort_order'];
}
