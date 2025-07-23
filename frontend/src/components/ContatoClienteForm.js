import React, { useState, useEffect } from 'react';
import ContatoClienteService from '../services/contatoCliente.service';
import { useParams, useNavigate } from 'react-router-dom';

const ContatoClienteForm = () => {
  const { clienteId, contatoId } = useParams();
  let navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (contatoId) {
      ContatoClienteService.getContato(contatoId)
        .then(response => {
          setNome(response.data.nome);
          setTelefone(response.data.telefone);
          setEmail(response.data.email);
          setCargo(response.data.cargo);
        })
        .catch(e => {
          setMessage('Erro ao carregar contato: ' + e.message);
          console.log(e);
        });
    }
  }, [contatoId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    const data = {
      cliente_id: clienteId,
      nome,
      telefone,
      email,
      cargo,
    };

    if (contatoId) {
      ContatoClienteService.updateContato(contatoId, data.cliente_id, data.nome, data.telefone, data.email, data.cargo)
        .then(response => {
          setMessage('Contato atualizado com sucesso!');
          navigate(`/clientes/${clienteId}/contatos`);
        })
        .catch(e => {
          setMessage('Erro ao atualizar contato: ' + e.message);
          console.log(e);
        });
    } else {
      ContatoClienteService.createContato(data.cliente_id, data.nome, data.telefone, data.email, data.cargo)
        .then(response => {
          setMessage('Contato criado com sucesso!');
          navigate(`/clientes/${clienteId}/contatos`);
        })
        .catch(e => {
          setMessage('Erro ao criar contato: ' + e.message);
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
      <h4>{contatoId ? 'Editar Contato' : 'Adicionar Contato'}</h4>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cargo">Cargo</label>
          <input
            type="text"
            className="form-control"
            id="cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success">
          {contatoId ? 'Atualizar' : 'Salvar'}
        </button>
      </form>
    </div>
  );
};

export default ContatoClienteForm;