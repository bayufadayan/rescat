<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('scan_images', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('scan_id')->constrained('scan_sessions')->onDelete('cascade');
            $table->string('type'); // e.g., 'face', 'ear', 'mouth', etc.
            $table->string('original_url');
            $table->string('processed_url')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scan_images');
    }
};
