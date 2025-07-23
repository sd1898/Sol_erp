<?php

namespace App\Http\Controllers;

use App\Models\PerfilPermissao;
use Illuminate\Http\Request;

class PerfilPermissaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(PerfilPermissao::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nome_perfil' => 'required|string|max:255|unique:perfil_permissoes',
            'permissoes_json' => 'nullable|json',
        ]);

        $perfilPermissao = PerfilPermissao::create($request->all());

        return response()->json($perfilPermissao, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(PerfilPermissao::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $perfilPermissao = PerfilPermissao::findOrFail($id);

        $request->validate([
            'nome_perfil' => 'required|string|max:255|unique:perfil_permissoes,nome_perfil,' . $id,
            'permissoes_json' => 'nullable|json',
        ]);

        $perfilPermissao->update($request->all());

        return response()->json($perfilPermissao);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        PerfilPermissao::findOrFail($id)->delete();

        return response()->json(null, 204);
    }
}
