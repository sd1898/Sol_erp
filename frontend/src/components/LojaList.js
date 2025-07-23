import React, { useState, useEffect } from 'react';
import LojaService from '../services/loja.service';
import { Link } from 'react-router-dom';

const LojaList = () => {
  const [lojas, setLojas] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    retrieveLojas();
  }, []);

  const retrieveLojas = () => {
    LojaService.getAllLojas()
      .then(response => {
        setLojas(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar lojas: ' + e.message);
        console.log(e);
      });
  };

  const deleteLoja = (id) => {
    LojaService.deleteLoja(id)
      .then(response => {
        setMessage('Loja excluída com sucesso!');
        retrieveLojas();
      })
      .catch(e => {
        setMessage('Erro ao excluir loja: ' + e.message);
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>Lista de Lojas</h4>
        <div className="mb-3">
          <Link to={'/lojas/add'} className="btn btn-primary">
            Adicionar Loja
          </Link>
        </div>
        <ul className="list-group">
          {lojas &&
            lojas.map((loja, index) => (
              <li
                className="list-group-item"
                key={index}
              >
                {loja.nome} ({loja.cnpj})
                <div className="float-right">
                  <Link
                    to={'/lojas/' + loja.id}
                    className="badge badge-warning mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="badge badge-danger"
                    onClick={() => deleteLoja(loja.id)}
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

export default LojaList;