import React, { useState, useEffect } from 'react';
import OrdemServicoService from '../services/ordemServico.service';
import { Link } from 'react-router-dom';

const OrdemServicoList = () => {
  const [ordemServicos, setOrdemServicos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    retrieveOrdemServicos();
  }, []);

  const retrieveOrdemServicos = () => {
    OrdemServicoService.getAllOrdemServicos()
      .then(response => {
        setOrdemServicos(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar Ordens de Serviço: ' + e.message);
        console.log(e);
      });
  };

  const deleteOrdemServico = (id) => {
    OrdemServicoService.deleteOrdemServico(id)
      .then(response => {
        setMessage('Ordem de Serviço excluída com sucesso!');
        retrieveOrdemServicos();
      })
      .catch(e => {
        setMessage('Erro ao excluir Ordem de Serviço: ' + e.message);
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>Lista de Ordens de Serviço</h4>
        <div className="mb-3">
          <Link to={'/ordem-servicos/add'} className="btn btn-primary">
            Adicionar Ordem de Serviço
          </Link>
        </div>
        <ul className="list-group">
          {ordemServicos &&
            ordemServicos.map((os, index) => (
              <li
                className="list-group-item"
                key={index}
              >
                OS: {os.numero_os} - Cliente: {os.cliente_id} - Loja: {os.loja_id} - Status: {os.status_id}
                <div className="float-right">
                  <Link
                    to={'/ordem-servicos/' + os.id}
                    className="badge badge-warning mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="badge badge-danger"
                    onClick={() => deleteOrdemServico(os.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
        </ul>
        {message && (
          <div className="alert alert-info mt-3" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdemServicoList;