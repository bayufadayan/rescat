<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class ScanImage extends Model
{
    use HasFactory, SoftDeletes, HasUlids;

    protected $table = 'scan_session_images';

    protected $fillable = [
        'scan_id',
        'img_original_id',
        'img_original_url',
        'img_bounding_box_id',
        'img_bounding_box_url',
        'img_roi_id',
        'img_roi_url',
        'img_remove_bg_id',
        'img_remove_bg_url',
    ];

    protected $casts = [
        'type' => 'string',
    ];

    public function session()
    {
        return $this->belongsTo(ScanSession::class, 'scan_id', 'id');
    }
}
