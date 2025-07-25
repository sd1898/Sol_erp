import React, { useState, useEffect } from 'react';
import DashboardService from '../services/dashboard.service';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    DashboardService.getDashboardData()
      .then(response => {
        setDashboardData(response.data);
      })
      .catch(error => {
        setMessage('Erro ao carregar dados do dashboard: ' + error.message);
        console.error('Erro ao carregar dados do dashboard:', error);
      });
  }, []);

  if (!dashboardData) {
    return (
      <div className="container mt-3">
        {message ? (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        ) : (
          <div>Carregando dados do dashboard...</div>
        )}
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h4>Dashboard</h4>
      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}
      <div className="row">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Total de Clientes</div>
            <div className="card-body">
              <h5 className="card-title">{dashboardData.totalClientes}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Total de Ordens de Serviço</div>
            <div className="card-body">
              <h5 className="card-title">{dashboardData.totalOrdensServico}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-info mb-3">
            <div className="card-header">Total de Produtos/Serviços</div>
            <div className="card-body">
              <h5 className="card-title">{dashboardData.totalProdutosServicos}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Total de Lojas</div>
            <div className="card-body">
              <h5 className="card-title">{dashboardData.totalLojas}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Ordens de Serviço por Status</div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {dashboardData.ordensPorStatus.map((item, index) => (
                  <li key={index} className="list-group-item">
                    Status ID: {item.status_id} - Total: {item.total}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Análise do SolucioBot</div>
            <div className="card-body">
              <h6>Contagem de Tipos de Serviço:</h6>
              <ul className="list-group list-group-flush">
                {Object.entries(dashboardData.solucioBotAnalysis.analise_dashboard.tipo_servico_counts).map(([tipo, count]) => (
                  <li key={tipo} className="list-group-item">
                    {tipo}: {count}
                  </li>
                ))}
              </ul>
              <h6 className="mt-3">Média de Tempo de Conclusão (Simulado):</h6>
              <p>{dashboardData.solucioBotAnalysis.analise_dashboard.media_tempo_conclusao}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;