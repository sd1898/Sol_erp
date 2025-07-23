import React, { useState, useEffect } from 'react';
import LojaService from '../services/loja.service';
import { useParams, useNavigate } from 'react-router-dom';

const LojaForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [emailContato, setEmailContato] = useState('');
  const [horarioFuncionamento, setHorarioFuncionamento] = useState('');
  const [status, setStatus] = useState('ativo');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      LojaService.getLoja(id)
        .then(response => {
          setNome(response.data.nome);
          setCnpj(response.data.cnpj);
          setEndereco(response.data.endereco);
          setTelefone(response.data.telefone);
          setEmailContato(response.data.email_contato);
          setHorarioFuncionamento(response.data.horario_funcionamento);
          setStatus(response.data.status);
        })
        .catch(e => {
          setMessage('Erro ao carregar loja: ' + e.message);
          console.log(e);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    const data = {
      nome,
      cnpj,
      endereco,
      telefone,
      email_contato: emailContato,
      horario_funcionamento: horarioFuncionamento,
      status,
    };

    if (id) {
      LojaService.updateLoja(id, data.nome, data.cnpj, data.endereco, data.telefone, data.email_contato, data.horario_funcionamento, data.status)
        .then(response => {
          setMessage('Loja atualizada com sucesso!');
          navigate('/lojas');
        })
        .catch(e => {
          setMessage('Erro ao atualizar loja: ' + e.message);
          console.log(e);
        });
    } else {
      LojaService.createLoja(data.nome, data.cnpj, data.endereco, data.telefone, data.email_contato, data.horario_funcionamento, data.status)
        .then(response => {
          setMessage('Loja criada com sucesso!');
          navigate('/lojas');
        })
        .catch(e => {
          setMessage('Erro ao criar loja: ' + e.message);
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
      <h4>{id ? 'Editar Loja' : 'Adicionar Loja'}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
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
          <label htmlFor="cnpj">CNPJ</label>
          <input
            type="text"
            className="form-control"
            id="cnpj"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="endereco">Endereço</label>
          <input
            type="text"
            className="form-control"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="text"
            className="form-control"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailContato">Email de Contato</label>
          <input
            type="email"
            className="form-control"
            id="emailContato"
            value={emailContato}
            onChange={(e) => setEmailContato(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="horarioFuncionamento">Horário de Funcionamento</label>
          <input
            type="text"
            className="form-control"
            id="horarioFuncionamento"
            value={horarioFuncionamento}
            onChange={(e) => setHorarioFuncionamento(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          {id ? 'Atualizar' : 'Salvar'}
        </button>
      </form>
    </div>
  );
};

export default LojaForm;