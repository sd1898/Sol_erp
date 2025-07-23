import React, { useState, useEffect } from 'react';
import StatusOSService from '../services/statusOS.service';
import { useParams, useNavigate } from 'react-router-dom';

const StatusOSForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [finalizaOs, setFinalizaOs] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      StatusOSService.getStatusOS(id)
        .then(response => {
          setNome(response.data.nome);
          setDescricao(response.data.descricao);
          setFinalizaOs(response.data.finaliza_os);
        })
        .catch(e => {
          setMessage('Erro ao carregar status de OS: ' + e.message);
          console.log(e);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    const data = {
      nome,
      descricao,
      finaliza_os: finalizaOs,
    };

    if (id) {
      StatusOSService.updateStatusOS(id, data.nome, data.descricao, data.finaliza_os)
        .then(response => {
          setMessage('Status de OS atualizado com sucesso!');
          navigate('/status-os');
        })
        .catch(e => {
          setMessage('Erro ao atualizar status de OS: ' + e.message);
          console.log(e);
        });
    } else {
      StatusOSService.createStatusOS(data.nome, data.descricao, data.finaliza_os)
        .then(response => {
          setMessage('Status de OS criado com sucesso!');
          navigate('/status-os');
        })
        .catch(e => {
          setMessage('Erro ao criar status de OS: ' + e.message);
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
      <h4>{id ? 'Editar Status de OS' : 'Adicionar Status de OS'}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Status</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            className="form-control"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows="3"
          ></textarea>
        </div>

        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="finalizaOs"
            checked={finalizaOs}
            onChange={(e) => setFinalizaOs(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="finalizaOs">
            Finaliza OS
          </label>
        </div>

        <button type="submit" className="btn btn-success">
          {id ? 'Atualizar' : 'Salvar'}
        </button>
      </form>
    </div>
  );
};

export default StatusOSForm;