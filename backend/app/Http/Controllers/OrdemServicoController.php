<?php

namespace App\Http\Controllers;

use App\Models\OrdemServico;
use Illuminate\Http\Request;

class OrdemServicoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(OrdemServico::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'numero_os' => 'required|string|unique:ordem_servicos',
            'cliente_id' => 'required|exists:clientes,id',
            'loja_id' => 'required|exists:lojas,id',
            'tecnico_id' => 'nullable|exists:users,id',
            'tipo_servico' => 'required|string',
            'prioridade' => 'required|string',
            'data_abertura' => 'required|date',
            'data_agendamento' => 'nullable|date',
            'prazo_execucao' => 'nullable|date',
            'descricao_problema' => 'required|string',
            'status_id' => 'required|string',
            'observacoes_gerais' => 'nullable|string',
        ]);

        $ordemServico = OrdemServico::create($request->all());

        return response()->json($ordemServico, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(OrdemServico::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ordemServico = OrdemServico::findOrFail($id);

        $request->validate([
            'numero_os' => 'required|string|unique:ordem_servicos,numero_os,' . $id,
            'cliente_id' => 'required|exists:clientes,id',
            'loja_id' => 'required|exists:lojas,id',
            'tecnico_id' => 'nullable|exists:users,id',
            'tipo_servico' => 'required|string',
            'prioridade' => 'required|string',
            'data_abertura' => 'required|date',
            'data_agendamento' => 'nullable|date',
            'prazo_execucao' => 'nullable|date',
            'descricao_problema' => 'required|string',
            'status_id' => 'required|string',
            'observacoes_gerais' => 'nullable|string',
        ]);

        $ordemServico->update($request->all());

        return response()->json($ordemServico);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        OrdemServico::findOrFail($id)->delete();

        return response()->json(null, 204);
    }
}
