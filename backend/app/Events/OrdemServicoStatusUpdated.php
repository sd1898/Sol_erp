<?php

namespace App\Events;

use App\Models\OrdemServico;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrdemServicoStatusUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $ordemServico;

    /**
     * Create a new event instance.
     */
    public function __construct(OrdemServico $ordemServico)
    {
        $this->ordemServico = $ordemServico;
    }
}
