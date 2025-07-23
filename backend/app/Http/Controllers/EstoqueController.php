<?php

namespace App\Http\Controllers;

use App\Models\Estoque;
use Illuminate\Http\Request;

class EstoqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Estoque::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'produto_id' => 'required|exists:produto_servicos,id',
            'loja_id' => 'required|exists:lojas,id',
            'quantidade_atual' => 'required|integer|min:0',
            'estoque_minimo' => 'nullable|integer|min:0',
            'localizacao' => 'nullable|string',
        ]);

        $estoque = Estoque::create($request->all());

        return response()->json($estoque, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Estoque::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $estoque = Estoque::findOrFail($id);

        $request->validate([
            'produto_id' => 'required|exists:produto_servicos,id',
            'loja_id' => 'required|exists:lojas,id',
            'quantidade_atual' => 'required|integer|min:0',
            'estoque_minimo' => 'nullable|integer|min:0',
            'localizacao' => 'nullable|string',
        ]);

        $estoque->update($request->all());

        return response()->json($estoque);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Estoque::findOrFail($id)->delete();

        return response()->json(null, 204);
    }
}
