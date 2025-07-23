import React, { useState, useEffect } from 'react';
import StatusOSService from '../services/statusOS.service';
import { Link } from 'react-router-dom';

const StatusOSList = () => {
  const [statusOS, setStatusOS] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    retrieveStatusOS();
  }, []);

  const retrieveStatusOS = () => {
    StatusOSService.getAllStatusOS()
      .then(response => {
        setStatusOS(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar status de OS: ' + e.message);
        console.log(e);
      });
  };

  const deleteStatusOS = (id) => {
    StatusOSService.deleteStatusOS(id)
      .then(response => {
        setMessage('Status de OS excluído com sucesso!');
        retrieveStatusOS();
      })
      .catch(e => {
        setMessage('Erro ao excluir status de OS: ' + e.message);
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>Lista de Status de OS</h4>
        <div className="mb-3">
          <Link to={'/status-os/add'} className="btn btn-primary">
            Adicionar Status de OS
          </Link>
        </div>
        <ul className="list-group">
          {statusOS &&
            statusOS.map((status, index) => (
              <li
                className="list-group-item"
                key={index}
              >
                {status.nome} {status.finaliza_os ? '(Finaliza OS)' : ''}
                <div className="float-right">
                  <Link
                    to={'/status-os/' + status.id}
                    className="badge badge-warning mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="badge badge-danger"
                    onClick={() => deleteStatusOS(status.id)}
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

export default StatusOSList;