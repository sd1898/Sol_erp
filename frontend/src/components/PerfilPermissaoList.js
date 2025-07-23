import React, { useState, useEffect } from 'react';
import PerfilService from '../services/perfil.service';
import { Link } from 'react-router-dom';

const PerfilPermissaoList = () => {
  const [perfis, setPerfis] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    retrievePerfis();
  }, []);

  const retrievePerfis = () => {
    PerfilService.getAllPerfis()
      .then(response => {
        setPerfis(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar perfis: ' + e.message);
        console.log(e);
      });
  };

  const deletePerfil = (id) => {
    PerfilService.deletePerfil(id)
      .then(response => {
        setMessage('Perfil excluído com sucesso!');
        retrievePerfis();
      })
      .catch(e => {
        setMessage('Erro ao excluir perfil: ' + e.message);
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>Lista de Perfis de Permissão</h4>
        <div className="mb-3">
          <Link to={'/perfil-permissoes/add'} className="btn btn-primary">
            Adicionar Perfil
          </Link>
        </div>
        <ul className="list-group">
          {perfis &&
            perfis.map((perfil, index) => (
              <li
                className="list-group-item"
                key={index}
              >
                {perfil.nome_perfil}
                <div className="float-right">
                  <Link
                    to={'/perfil-permissoes/' + perfil.id}
                    className="badge badge-warning mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="badge badge-danger"
                    onClick={() => deletePerfil(perfil.id)}
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

export default PerfilPermissaoList;