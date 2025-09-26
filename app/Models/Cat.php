<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Cat extends Model
{
    use HasFactory, SoftDeletes, HasUlids;

    protected $fillable = [
        'user_id',
        'name',
        'breed',
        'gender',
        'birth_date',
        'avatar',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'gender' => 'string',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
