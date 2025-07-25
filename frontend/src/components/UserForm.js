import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import PerfilService from '../services/perfil.service';
import { useParams, useNavigate } from 'react-router-dom';

const UserForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [perfilPermissaoId, setPerfilPermissaoId] = useState('');
  const [perfisPermissao, setPerfisPermissao] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    PerfilService.getAllPerfis()
      .then(response => {
        setPerfisPermissao(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar perfis de permissão: ' + e.message);
        console.log(e);
      });

    if (id) {
      AuthService.getUser(id)
        .then(response => {
          setName(response.data.name);
          setEmail(response.data.email);
          setPerfilPermissaoId(response.data.perfil_permissao_id || '');
        })
        .catch(e => {
          setMessage('Erro ao carregar usuário: ' + e.message);
          console.log(e);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    const data = {
      name,
      email,
      password,
      perfil_permissao_id: perfilPermissaoId || null,
    };

    if (id) {
      AuthService.updateUser(id, data.name, data.email, data.password, data.perfil_permissao_id)
        .then(response => {
          setMessage('Usuário atualizado com sucesso!');
          navigate('/users');
        })
        .catch(e => {
          setMessage('Erro ao atualizar usuário: ' + e.message);
          console.log(e);
        });
    } else {
      AuthService.register(data.name, data.email, data.password, data.password) // password_confirmation é igual a password para registro
        .then(response => {
          setMessage('Usuário criado com sucesso!');
          navigate('/users');
        })
        .catch(e => {
          setMessage('Erro ao criar usuário: ' + e.message);
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
      <h4>{id ? 'Editar Usuário' : 'Adicionar Usuário'}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha {id && '(deixe em branco para não alterar)'}</label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...(!id && { required: true })} // Requerido apenas na criação
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="perfilPermissaoId">Perfil de Permissão</label>
          <select
            className="form-control"
            id="perfilPermissaoId"
            value={perfilPermissaoId}
            onChange={(e) => setPerfilPermissaoId(e.target.value)}
          >
            <option value="">Selecione um Perfil</option>
            {perfisPermissao.map((perfil) => (
              <option key={perfil.id} value={perfil.id}>
                {perfil.nome_perfil}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          {id ? 'Atualizar' : 'Salvar'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;