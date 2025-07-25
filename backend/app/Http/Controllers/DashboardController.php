<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\OrdemServico;
use App\Models\ProdutoServico;
use App\Models\Loja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
{
    public function index()
    {
        $totalClientes = Cliente::count();
        $totalOrdensServico = OrdemServico::count();
        $totalProdutosServicos = ProdutoServico::count();
        $totalLojas = Loja::count();

        // Exemplo de dados mais complexos: Ordens de Serviço por status
        $ordensPorStatus = OrdemServico::select('status_id', \DB::raw('count(*) as total'))
            ->groupBy('status_id')
            ->get();

        // Buscar dados brutos das Ordens de Serviço para análise do SolucioBot
        $ordensServicoData = OrdemServico::select('tipo_servico', 'data_abertura', 'data_agendamento', 'prazo_execucao', 'prioridade', 'status_id')->get()->toArray();

        // Enviar dados para o SolucioBot para análise
        $solucioBotAnalysis = [];
        try {
            $response = Http::post('http://soluciobot_ai:5000/analyze_dashboard_data', ['ordens_servico' => $ordensServicoData]);
            if ($response->successful()) {
                $solucioBotAnalysis = $response->json();
            } else {
                // Log do erro se a comunicação com o SolucioBot falhar
                \Log::error('Erro ao comunicar com o SolucioBot para análise do dashboard: ' . $response->body());
            }
        } catch (\Exception $e) {
            \Log::error('Erro de conexão com o SolucioBot para análise do dashboard: ' . $e->getMessage());
        }

        return response()->json([
            'totalClientes' => $totalClientes,
            'totalOrdensServico' => $totalOrdensServico,
            'totalProdutosServicos' => $totalProdutosServicos,
            'totalLojas' => $totalLojas,
            'ordensPorStatus' => $ordensPorStatus,
            'solucioBotAnalysis' => $solucioBotAnalysis,
        ]);
    }

}
