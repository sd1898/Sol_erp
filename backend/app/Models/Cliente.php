<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'cpf_cnpj',
        'endereco',
        'email',
        'informacoes_contratuais',
        'id_loja_cadastro',
    ];

    public function loja(){
        return $this->belongsTo(Loja::class, 'id_loja_cadastro');
    }

    public function contatos(){
        return $this->hasMany(ContatoCliente::class, 'cliente_id');
    }
}
