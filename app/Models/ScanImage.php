<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class ScanImage extends Model
{
    use HasFactory, SoftDeletes, HasUlids;

    protected $table = 'scan_images';

    protected $fillable = [
        'scan_id',        // FK ke scan_sessions.ulid
        'type',           // 'ear' | 'mouth' | 'nose' | ...
        'original_url',
        'processed_url',
    ];

    protected $casts = [
        'type' => 'string',
    ];

    public function session()
    {
        return $this->belongsTo(ScanSession::class, 'scan_id', 'id');
    }
}
