<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class ScanResult extends Model
{
    use HasFactory, SoftDeletes, HasUlids;

    protected $table = 'scan_results';

    protected $fillable = [
        'scan_id',      // FK ke scan_sessions.ulid
        'total_score',  // DECIMAL(8,5)
        'label',
    ];

    protected $casts = [
        'total_score' => 'decimal:5',
        'label'       => 'string',
    ];

    public function session()
    {
        return $this->belongsTo(ScanSession::class, 'scan_id', 'id');
    }

    public function details()
    {
        return $this->hasMany(ScanResultDetail::class, 'scan_result_id');
    }
}
