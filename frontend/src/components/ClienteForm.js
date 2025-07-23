import React, { useState, useEffect } from 'react';
import ClienteService from '../services/cliente.service';
import LojaService from '../services/loja.service';
import { useParams, useNavigate } from 'react-router-dom';

const ClienteForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [informacoesContratuais, setInformacoesContratuais] = useState('');
  const [idLojaCadastro, setIdLojaCadastro] = useState('');
  const [lojas, setLojas] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    LojaService.getAllLojas()
      .then(response => {
        setLojas(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar lojas para seleção: ' + e.message);
        console.log(e);
      });

    if (id) {
      ClienteService.getCliente(id)
        .then(response => {
          setNome(response.data.nome);
          setCpfCnpj(response.data.cpf_cnpj);
          setEndereco(response.data.endereco);
          setEmail(response.data.email);
          setInformacoesContratuais(response.data.informacoes_contratuais);
          setIdLojaCadastro(response.data.id_loja_cadastro);
        })
        .catch(e => {
          setMessage('Erro ao carregar cliente: ' + e.message);
          console.log(e);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    const data = {
      nome,
      cpf_cnpj: cpfCnpj,
      endereco,
      email,
      informacoes_contratuais: informacoesContratuais,
      id_loja_cadastro: idLojaCadastro || null, // Garante que seja null se vazio
    };

    if (id) {
      ClienteService.updateCliente(id, data.nome, data.cpf_cnpj, data.endereco, data.email, data.informacoes_contratuais, data.id_loja_cadastro)
        .then(response => {
          setMessage('Cliente atualizado com sucesso!');
          navigate('/clientes');
        })
        .catch(e => {
          setMessage('Erro ao atualizar cliente: ' + e.message);
          console.log(e);
        });
    } else {
      ClienteService.createCliente(data.nome, data.cpf_cnpj, data.endereco, data.email, data.informacoes_contratuais, data.id_loja_cadastro)
        .then(response => {
          setMessage('Cliente criado com sucesso!');
          navigate('/clientes');
        })
        .catch(e => {
          setMessage('Erro ao criar cliente: ' + e.message);
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
      <h4>{id ? 'Editar Cliente' : 'Adicionar Cliente'}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome/Razão Social</label>
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
          <label htmlFor="cpfCnpj">CPF/CNPJ</label>
          <input
            type="text"
            className="form-control"
            id="cpfCnpj"
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(e.target.value)}
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
          <label htmlFor="informacoesContratuais">Informações Contratuais</label>
          <textarea
            className="form-control"
            id="informacoesContratuais"
            value={informacoesContratuais}
            onChange={(e) => setInformacoesContratuais(e.target.value)}
            rows="3"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="idLojaCadastro">Loja de Cadastro</label>
          <select
            className="form-control"
            id="idLojaCadastro"
            value={idLojaCadastro}
            onChange={(e) => setIdLojaCadastro(e.target.value)}
          >
            <option value="">Selecione uma Loja</option>
            {lojas.map((loja) => (
              <option key={loja.id} value={loja.id}>
                {loja.nome}
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

export default ClienteForm;