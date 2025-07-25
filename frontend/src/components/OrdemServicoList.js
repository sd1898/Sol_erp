import React, { useState, useEffect } from 'react';
import OrdemServicoService from '../services/ordemServico.service';
import { Link } from 'react-router-dom';

const OrdemServicoList = () => {
  const [ordemServicos, setOrdemServicos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [lojas, setLojas] = useState([]);
  const [statusOS, setStatusOS] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Promise.all([
      OrdemServicoService.getAllOrdemServicos(),
      OrdemServicoService.getAllClientes(),
      OrdemServicoService.getAllLojas(),
      OrdemServicoService.getAllStatusOS()
    ])
      .then(([osResponse, clientesResponse, lojasResponse, statusOSResponse]) => {
        setOrdemServicos(osResponse.data);
        setClientes(clientesResponse.data);
        setLojas(lojasResponse.data);
        setStatusOS(statusOSResponse.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar dados: ' + e.message);
        console.log(e);
      });
  }, []);

  const getClienteNome = (id) => {
    const cliente = clientes.find(c => c.id === id);
    return cliente ? cliente.nome : 'Desconhecido';
  };

  const getLojaNome = (id) => {
    const loja = lojas.find(l => l.id === id);
    return loja ? loja.nome : 'Desconhecida';
  };

  const getStatusNome = (id) => {
    const status = statusOS.find(s => s.id == id);
    return status ? status.nome : 'Desconhecido';
  };

  const deleteOrdemServico = (id) => {
    OrdemServicoService.deleteOrdemServico(id)
      .then(response => {
        setMessage('Ordem de Serviço excluída com sucesso!');
        // Recarrega todos os dados após a exclusão
        Promise.all([
          OrdemServicoService.getAllOrdemServicos(),
          OrdemServicoService.getAllClientes(),
          OrdemServicoService.getAllLojas(),
          OrdemServicoService.getAllStatusOS()
        ])
          .then(([osResponse, clientesResponse, lojasResponse, statusOSResponse]) => {
            setOrdemServicos(osResponse.data);
            setClientes(clientesResponse.data);
            setLojas(lojasResponse.data);
            setStatusOS(statusOSResponse.data);
          })
          .catch(e => {
            setMessage('Erro ao carregar dados após exclusão: ' + e.message);
            console.log(e);
          });
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
                OS: {os.numero_os} - Cliente: {getClienteNome(os.cliente_id)} - Loja: {getLojaNome(os.loja_id)} - Status: {getStatusNome(os.status_id)}
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