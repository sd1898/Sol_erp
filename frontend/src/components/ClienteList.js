import React, { useState, useEffect } from 'react';
import ClienteService from '../services/cliente.service';
import { Link } from 'react-router-dom';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    retrieveClientes();
  }, []);

  const retrieveClientes = () => {
    ClienteService.getAllClientes()
      .then(response => {
        setClientes(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar clientes: ' + e.message);
        console.log(e);
      });
  };

  const deleteCliente = (id) => {
    ClienteService.deleteCliente(id)
      .then(response => {
        setMessage('Cliente excluído com sucesso!');
        retrieveClientes();
      })
      .catch(e => {
        setMessage('Erro ao excluir cliente: ' + e.message);
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>Lista de Clientes</h4>
        <div className="mb-3">
          <Link to={'/clientes/add'} className="btn btn-primary">
            Adicionar Cliente
          </Link>
        </div>
        <ul className="list-group">
          {clientes &&
            clientes.map((cliente, index) => (
              <li
                className="list-group-item"
                key={index}
              >
                {cliente.nome} ({cliente.cpf_cnpj})
                <div className="float-right">
                  <Link
                    to={'/clientes/' + cliente.id}
                    className="badge badge-warning mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="badge badge-danger"
                    onClick={() => deleteCliente(cliente.id)}
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

export default ClienteList;