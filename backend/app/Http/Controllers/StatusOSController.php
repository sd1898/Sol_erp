<?php

namespace App\Http\Controllers;

use App\Models\StatusOS;
use Illuminate\Http\Request;

class StatusOSController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(StatusOS::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255|unique:status_os',
            'descricao' => 'nullable|string',
            'finaliza_os' => 'boolean',
        ]);

        $statusOS = StatusOS::create($request->all());

        return response()->json($statusOS, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(StatusOS::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $statusOS = StatusOS::findOrFail($id);

        $request->validate([
            'nome' => 'required|string|max:255|unique:status_os,nome,' . $id,
            'descricao' => 'nullable|string',
            'finaliza_os' => 'boolean',
        ]);

        $statusOS->update($request->all());

        return response()->json($statusOS);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        StatusOS::findOrFail($id)->delete();

        return response()->json(null, 204);
    }
}
