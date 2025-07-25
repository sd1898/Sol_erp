<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SolucioBotController extends Controller
{
    public function analyze(Request $request)
    {
        try {
            $response = Http::post('http://soluciobot_ai:5000/analyze', $request->all());

            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                return response()->json(['error' => 'Erro ao comunicar com o SolucioBot', 'details' => $response->body()], $response->status());
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro de conexão com o SolucioBot', 'details' => $e->getMessage()], 500);
        }
    }
}
