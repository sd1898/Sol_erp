<?php

namespace App\Http\Controllers;

use App\Models\ContatoCliente;
use Illuminate\Http\Request;

class ContatoClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(ContatoCliente::all());
    }

    public function indexByClient($clienteId)
    {
        return response()->json(ContatoCliente::where('cliente_id', $clienteId)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'nome' => 'required|string|max:255',
            'telefone' => 'nullable|string',
            'email' => 'nullable|string|email',
            'cargo' => 'nullable|string',
        ]);

        $contatoCliente = ContatoCliente::create($request->all());

        return response()->json($contatoCliente, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(ContatoCliente::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $contatoCliente = ContatoCliente::findOrFail($id);

        $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'nome' => 'required|string|max:255',
            'telefone' => 'nullable|string',
            'email' => 'nullable|string|email',
            'cargo' => 'nullable|string',
        ]);

        $contatoCliente->update($request->all());

        return response()->json($contatoCliente);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        ContatoCliente::findOrFail($id)->delete();

        return response()->json(null, 204);
    }
}
