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
        Schema::create('scan_result_details', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('scan_result_id')->constrained()->onDelete('cascade');
            $table->string('criteria'); // e.g., 'skin', 'eyes', 'ears', etc.
            $table->decimal('score', 8, 5);
            $table->string('remarks'); // e.g., 'Healthy', 'Needs Attention', etc.
            $table->text('description')->nullable(); // Optional detailed description (AI Agents)
            $table->text('advice')->nullable(); // Optional advice or recommendations (AI Agents)
            $table->string('photo_url')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scan_result_details');
    }
};
