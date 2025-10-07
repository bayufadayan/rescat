<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class ScanResultDetail extends Model
{
    use HasFactory, SoftDeletes, HasUlids;

    protected $table = 'scan_result_details';

    protected $fillable = [
        'scan_result_id', // FK ke scan_results.id
        'criteria',       // contoh: 'skin', 'eyes', 'ears', ...
        'score',          // DECIMAL(8,5)
        'remarks',        // ringkas: 'Healthy', 'Needs Attention', ...
        'description',    // penjelasan detail (opsional)
        'advice',         // saran/rekomendasi (opsional)
        'photo_url',
    ];

    protected $casts = [
        'score'    => 'decimal:5',
        'criteria' => 'string',
        'remarks'  => 'string',
    ];

    public function result()
    {
        return $this->belongsTo(ScanResult::class, 'scan_result_id');
    }
}
