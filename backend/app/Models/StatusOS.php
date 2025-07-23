<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusOS extends Model
{
    use HasFactory;

    protected $table = 'status_os'; // Define o nome da tabela explicitamente

    protected $fillable = [
        'nome',
        'descricao',
        'finaliza_os',
    ];

    protected $casts = [
        'finaliza_os' => 'boolean',
    ];
