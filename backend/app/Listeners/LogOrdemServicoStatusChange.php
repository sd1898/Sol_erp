<?php

namespace App\Listeners;

use App\Events\OrdemServicoStatusUpdated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class LogOrdemServicoStatusChange
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(OrdemServicoStatusUpdated $event): void
    {
        $ordemServico = $event->ordemServico;
        Log::info("Notificação: Status da OS #{$ordemServico->numero_os} alterado para {$ordemServico->status_id}.");
    }
}
