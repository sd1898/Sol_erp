<?php

namespace App\Http\Controllers;

use App\Models\ProdutoServico;
use Illuminate\Http\Request;

class ProdutoServicoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(ProdutoServico::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'preco_venda' => 'required|numeric',
            'custo' => 'nullable|numeric',
            'unidade_medida' => 'nullable|string',
            'codigo_barras' => 'nullable|string|unique:produto_servicos',
            'impostos' => 'nullable|string',
            'categoria' => 'nullable|string',
            'tipo_item' => 'required|string',
            'status' => 'nullable|string',
        ]);

        $produtoServico = ProdutoServico::create($request->all());

        return response()->json($produtoServico, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(ProdutoServico::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $produtoServico = ProdutoServico::findOrFail($id);

        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'preco_venda' => 'required|numeric',
            'custo' => 'nullable|numeric',
            'unidade_medida' => 'nullable|string',
            'codigo_barras' => 'nullable|string|unique:produto_servicos,codigo_barras,' . $id,
            'impostos' => 'nullable|string',
            'categoria' => 'nullable|string',
            'tipo_item' => 'required|string',
            'status' => 'nullable|string',
        ]);

        $produtoServico->update($request->all());

        return response()->json($produtoServico);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        ProdutoServico::findOrFail($id)->delete();

        return response()->json(null, 204);
    }
}
