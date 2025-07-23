import React, { useState, useEffect } from 'react';
import EstoqueService from '../services/estoque.service';
import { Link } from 'react-router-dom';

const EstoqueList = () => {
  const [estoques, setEstoques] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    retrieveEstoques();
  }, []);

  const retrieveEstoques = () => {
    EstoqueService.getAllEstoques()
      .then(response => {
        setEstoques(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar estoques: ' + e.message);
        console.log(e);
      });
  };

  const deleteEstoque = (id) => {
    EstoqueService.deleteEstoque(id)
      .then(response => {
        setMessage('Item de estoque excluído com sucesso!');
        retrieveEstoques();
      })
      .catch(e => {
        setMessage('Erro ao excluir item de estoque: ' + e.message);
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>Lista de Estoques</h4>
        <div className="mb-3">
          <Link to={'/estoques/add'} className="btn btn-primary">
            Adicionar Item de Estoque
          </Link>
        </div>
        <ul className="list-group">
          {estoques &&
            estoques.map((item, index) => (
              <li
                className="list-group-item"
                key={index}
              >
                Produto ID: {item.produto_id} - Loja ID: {item.loja_id} - Qtd: {item.quantidade_atual}
                <div className="float-right">
                  <Link
                    to={'/estoques/' + item.id}
                    className="badge badge-warning mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="badge badge-danger"
                    onClick={() => deleteEstoque(item.id)}
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

export default EstoqueList;