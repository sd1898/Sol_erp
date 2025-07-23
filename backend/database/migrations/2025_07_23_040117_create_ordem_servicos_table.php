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
        Schema::create('ordem_servicos', function (Blueprint $table) {
            $table->id();
            $table->string('numero_os')->unique();
            $table->foreignId('cliente_id')->constrained('clientes')->onDelete('cascade');
            $table->foreignId('loja_id')->constrained('lojas')->onDelete('cascade');
            $table->foreignId('tecnico_id')->nullable()->constrained('users')->onDelete('set null'); // Associa a um usuário (técnico)
            $table->string('tipo_servico'); // Ex: manutenção, instalação, reparo, vistoria
            $table->string('prioridade'); // Ex: alta, média, baixa
            $table->timestamp('data_abertura')->useCurrent();
            $table->timestamp('data_agendamento')->nullable();
            $table->timestamp('prazo_execucao')->nullable();
            $table->text('descricao_problema');
            $table->string('status_id'); // Será um ID de status, mas por enquanto string
            $table->text('observacoes_gerais')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ordem_servicos');
    }
};
