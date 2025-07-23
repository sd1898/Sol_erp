<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estoque extends Model
{
    use HasFactory;

    protected $fillable = [
        'produto_id',
        'loja_id',
        'quantidade_atual',
        'estoque_minimo',
        'localizacao',
    ];

    public function produtoServico()
    {
        return $this->belongsTo(ProdutoServico::class, 'produto_id');
    }

    public function loja()
    {
        return $this->belongsTo(Loja::class, 'loja_id');
    }
}
