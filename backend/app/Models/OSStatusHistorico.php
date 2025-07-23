<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OSStatusHistorico extends Model
{
    use HasFactory;

    protected $fillable = [
        'os_id',
        'status_id',
        'data_alteracao',
        'usuario_id',
    ];

    protected $casts = [
        'data_alteracao' => 'datetime',
    ];

    public function ordemServico()
    {
        return $this->belongsTo(OrdemServico::class, 'os_id');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }
