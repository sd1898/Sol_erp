<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutoServico extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'descricao',
        'preco_venda',
        'custo',
        'unidade_medida',
        'codigo_barras',
        'impostos',
        'categoria',
        'tipo_item',
        'status',
    ];
}
