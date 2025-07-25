import React, { useState, useEffect } from 'react';
import ContatoClienteService from '../services/contatoCliente.service';
import { Link, useParams } from 'react-router-dom';

const ContatoClienteList = () => {
  const { clienteId } = useParams(); // Pega o ID do cliente da URL
  const [contatos, setContatos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (clienteId) {
      retrieveContatos(clienteId);
    }
  }, [clienteId]);

  const retrieveContatos = (id) => {
    ContatoClienteService.getContatosByCliente(id)
      .then(response => {
        setContatos(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar contatos: ' + e.message);
        console.log(e);
      });
  };

  const deleteContato = (id) => {
    ContatoClienteService.deleteContato(id)
      .then(response => {
        setMessage('Contato excluído com sucesso!');
        retrieveContatos(clienteId);
      })
      .catch(e => {
        setMessage('Erro ao excluir contato: ' + e.message);
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>Contatos do Cliente {clienteId}</h4>
        <div className="mb-3">
          <Link to={`/clientes/${clienteId}/contatos/add`} className="btn btn-primary">
            Adicionar Contato
          </Link>
        </div>
        <ul className="list-group">
          {contatos &&
            contatos.map((contato, index) => (
              <li
                className="list-group-item"
                key={index}
              >
                {contato.nome} - {contato.telefone}
                <div className="float-right">
                  <Link
                    to={`/clientes/${clienteId}/contatos/${contato.id}`}
                    className="badge badge-warning mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="badge badge-danger"
                    onClick={() => deleteContato(contato.id)}
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

export default ContatoClienteList;