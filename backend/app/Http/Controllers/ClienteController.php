<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Cliente::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'cpf_cnpj' => 'nullable|string|unique:clientes',
            'endereco' => 'nullable|string',
            'email' => 'nullable|string|email',
            'informacoes_contratuais' => 'nullable|string',
            'id_loja_cadastro' => 'nullable|exists:lojas,id',
        ]);

        $cliente = Cliente::create($request->all());

        return response()->json($cliente, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Cliente::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $cliente = Cliente::findOrFail($id);

        $request->validate([
            'nome' => 'required|string|max:255',
            'cpf_cnpj' => 'nullable|string|unique:clientes,cpf_cnpj,' . $id,
            'endereco' => 'nullable|string',
            'email' => 'nullable|string|email',
            'informacoes_contratuais' => 'nullable|string',
            'id_loja_cadastro' => 'nullable|exists:lojas,id',
        ]);

        $cliente->update($request->all());

        return response()->json($cliente);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Cliente::findOrFail($id)->delete();

        return response()->json(null, 204);
    }
}
