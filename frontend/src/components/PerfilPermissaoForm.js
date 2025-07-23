import React, { useState, useEffect } from 'react';
import PerfilService from '../services/perfil.service';
import { useParams, useNavigate } from 'react-router-dom';

const PerfilPermissaoForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [nomePerfil, setNomePerfil] = useState('');
  const [permissoesJson, setPermissoesJson] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      PerfilService.getPerfil(id)
        .then(response => {
          setNomePerfil(response.data.nome_perfil);
          setPermissoesJson(JSON.stringify(response.data.permissoes_json, null, 2));
        })
        .catch(e => {
          setMessage('Erro ao carregar perfil: ' + e.message);
          console.log(e);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    const data = {
      nome_perfil: nomePerfil,
      permissoes_json: permissoesJson ? JSON.parse(permissoesJson) : null,
    };

    if (id) {
      PerfilService.updatePerfil(id, data.nome_perfil, data.permissoes_json)
        .then(response => {
          setMessage('Perfil atualizado com sucesso!');
          navigate('/perfil-permissoes');
        })
        .catch(e => {
          setMessage('Erro ao atualizar perfil: ' + e.message);
          console.log(e);
        });
    } else {
      PerfilService.createPerfil(data.nome_perfil, data.permissoes_json)
        .then(response => {
          setMessage('Perfil criado com sucesso!');
          navigate('/perfil-permissoes');
        })
        .catch(e => {
          setMessage('Erro ao criar perfil: ' + e.message);
          console.log(e);
        });
    }
  };

  return (
    <div className="submit-form">
      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}
      <h4>{id ? 'Editar Perfil de Permissão' : 'Adicionar Perfil de Permissão'}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nomePerfil">Nome do Perfil</label>
          <input
            type="text"
            className="form-control"
            id="nomePerfil"
            required
            value={nomePerfil}
            onChange={(e) => setNomePerfil(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="permissoesJson">Permissões (JSON)</label>
          <textarea
            className="form-control"
            id="permissoesJson"
            value={permissoesJson}
            onChange={(e) => setPermissoesJson(e.target.value)}
            rows="5"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success">
          {id ? 'Atualizar' : 'Salvar'}
        </button>
      </form>
    </div>
  );
};

export default PerfilPermissaoForm;