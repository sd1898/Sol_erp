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
        Schema::create('os_status_historicos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('os_id')->constrained('ordem_servicos')->onDelete('cascade');
            $table->string('status_id'); // O status em si (ex: Aberta, Em Andamento, Finalizada)
            $table->timestamp('data_alteracao')->useCurrent();
            $table->foreignId('usuario_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('os_status_historicos');
    }
};
