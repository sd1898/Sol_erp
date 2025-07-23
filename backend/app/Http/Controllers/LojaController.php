<?php

namespace App\Http\Controllers;

use App\Models\Loja;
use Illuminate\Http\Request;

class LojaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Loja::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'cnpj' => 'nullable|string|unique:lojas',
            'endereco' => 'nullable|string',
            'telefone' => 'nullable|string',
            'email_contato' => 'nullable|string|email',
            'horario_funcionamento' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        $loja = Loja::create($request->all());

        return response()->json($loja, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Loja::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $loja = Loja::findOrFail($id);

        $request->validate([
            'nome' => 'required|string|max:255',
            'cnpj' => 'nullable|string|unique:lojas,cnpj,' . $id,
            'endereco' => 'nullable|string',
            'telefone' => 'nullable|string',
            'email_contato' => 'nullable|string|email',
            'horario_funcionamento' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        $loja->update($request->all());

        return response()->json($loja);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Loja::findOrFail($id)->delete();

        return response()->json(null, 204);
    }
}
