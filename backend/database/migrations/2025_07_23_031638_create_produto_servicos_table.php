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
        Schema::create('produto_servicos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->text('descricao')->nullable();
            $table->decimal('preco_venda', 8, 2);
            $table->decimal('custo', 8, 2)->nullable();
            $table->string('unidade_medida')->nullable();
            $table->string('codigo_barras')->unique()->nullable();
            $table->string('impostos')->nullable();
            $table->string('categoria')->nullable();
            $table->string('tipo_item'); // Ex: Produto, Serviço
            $table->string('status')->default('ativo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produto_servicos');
    }
};
