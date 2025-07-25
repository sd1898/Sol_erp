<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\StatusOS;

class StatusOSSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StatusOS::create([
            'nome' => 'Aberto',
            'descricao' => 'Ordem de serviço recém-criada.',
            'finaliza_os' => false,
        ]);

        StatusOS::create([
            'nome' => 'Em Andamento',
            'descricao' => 'Ordem de serviço sendo executada.',
            'finaliza_os' => false,
        ]);

        StatusOS::create([
            'nome' => 'Concluído',
            'descricao' => 'Ordem de serviço finalizada com sucesso.',
            'finaliza_os' => true,
        ]);

        StatusOS::create([
            'nome' => 'Cancelado',
            'descricao' => 'Ordem de serviço cancelada.',
            'finaliza_os' => true,
        ]);
    }
}
