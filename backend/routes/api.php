<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PerfilPermissaoController;
use App\Http\Controllers\LojaController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ContatoClienteController;
use App\Http\Controllers\ProdutoServicoController;
use App\Http\Controllers\EstoqueController;
use App\Http\Controllers\OrdemServicoController;
use App\Http\Controllers\StatusOSController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/hello', function () {
    return ['message' => 'Hello from Backend!'];
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rotas para PerfilPermissao
    Route::resource('perfil-permissoes', PerfilPermissaoController::class);

    // Rotas para Loja
    Route::resource('lojas', LojaController::class);

    // Rotas para Cliente
    Route::resource('clientes', ClienteController::class);

    // Rotas para ContatoCliente
    Route::resource('contato-clientes', ContatoClienteController::class);
    Route::get('clientes/{cliente}/contatos', [ContatoClienteController::class, 'indexByClient']);

    // Rotas para ProdutoServico
    Route::resource('produto-servicos', ProdutoServicoController::class);

    // Rotas para Estoque
    Route::resource('estoques', EstoqueController::class);

    // Rotas para OrdemServico
    Route::resource('ordem-servicos', OrdemServicoController::class);

    // Rotas para StatusOS
    Route::resource('status-os', StatusOSController::class);

    // Rotas para Usuários
    Route::resource('users', App\Http\Controllers\UserController::class);

    // Rota para o Dashboard
    Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index']);

    // Rota para o SolucioBot AI
    Route::post('/soluciobot/analyze', [App\Http\Controllers\SolucioBotController::class, 'analyze']);
});
