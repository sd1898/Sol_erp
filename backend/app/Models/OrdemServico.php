<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrdemServico extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero_os',
        'cliente_id',
        'loja_id',
        'tecnico_id',
        'tipo_servico',
        'prioridade',
        'data_abertura',
        'data_agendamento',
        'prazo_execucao',
        'descricao_problema',
        'status_id',
        'observacoes_gerais',
    ];

    protected $casts = [
        'data_abertura' => 'datetime',
        'data_agendamento' => 'datetime',
        'prazo_execucao' => 'datetime',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function loja()
    {
        return $this->belongsTo(Loja::class);
    }

    public function tecnico()
    {
        return $this->belongsTo(User::class, 'tecnico_id');
    }
}
