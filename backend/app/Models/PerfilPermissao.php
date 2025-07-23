<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerfilPermissao extends Model
{
    use HasFactory;

    protected $fillable = ['nome_perfil', 'permissoes_json'];

    protected $casts = [
        'permissoes_json' => 'array',
    ];
}
