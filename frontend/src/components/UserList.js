import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    AuthService.getAllUsers()
      .then(response => {
        setUsers(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar usuários: ' + e.message);
        console.log(e);
      });
  };

  const deleteUser = (id) => {
    AuthService.deleteUser(id)
      .then(response => {
        setMessage('Usuário excluído com sucesso!');
        retrieveUsers();
      })
      .catch(e => {
        setMessage('Erro ao excluir usuário: ' + e.message);
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>Lista de Usuários</h4>
        <div className="mb-3">
          <Link to={'/users/add'} className="btn btn-primary">
            Adicionar Usuário
          </Link>
        </div>
        <ul className="list-group">
          {users &&
            users.map((user, index) => (
              <li
                className="list-group-item"
                key={index}
              >
                {user.name} ({user.email}) - Perfil: {user.perfil_permissao ? user.perfil_permissao.nome_perfil : 'Nenhum'}
                <div className="float-right">
                  <Link
                    to={'/users/' + user.id}
                    className="badge badge-warning mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="badge badge-danger"
                    onClick={() => deleteUser(user.id)}
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

export default UserList;