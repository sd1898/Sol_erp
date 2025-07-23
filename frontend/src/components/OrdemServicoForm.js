import React, { useState, useEffect } from 'react';
import OrdemServicoService from '../services/ordemServico.service';
import ClienteService from '../services/cliente.service';
import LojaService from '../services/loja.service';
import { useParams, useNavigate } from 'react-router-dom';

const OrdemServicoForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [numeroOs, setNumeroOs] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [lojaId, setLojaId] = useState('');
  const [tecnicoId, setTecnicoId] = useState(''); // Será preenchido com usuários
  const [tipoServico, setTipoServico] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [dataAbertura, setDataAbertura] = useState('');
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [prazoExecucao, setPrazoExecucao] = useState('');
  const [descricaoProblema, setDescricaoProblema] = useState('');
  const [statusId, setStatusId] = useState('');
  const [observacoesGerais, setObservacoesGerais] = useState('');
  const [clientes, setClientes] = useState([]);
  const [lojas, setLojas] = useState([]);
  const [tecnicos, setTecnicos] = useState([]); // Será preenchido com usuários
  const [message, setMessage] = useState('');

  useEffect(() => {
    ClienteService.getAllClientes()
      .then(response => {
        setClientes(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar clientes para seleção: ' + e.message);
        console.log(e);
      });

    LojaService.getAllLojas()
      .then(response => {
        setLojas(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar lojas para seleção: ' + e.message);
        console.log(e);
      });

    // TODO: Carregar técnicos (usuários) aqui

    if (id) {
      OrdemServicoService.getOrdemServico(id)
        .then(response => {
          setNumeroOs(response.data.numero_os);
          setClienteId(response.data.cliente_id);
          setLojaId(response.data.loja_id);
          setTecnicoId(response.data.tecnico_id);
          setTipoServico(response.data.tipo_servico);
          setPrioridade(response.data.prioridade);
          setDataAbertura(response.data.data_abertura ? new Date(response.data.data_abertura).toISOString().slice(0, 16) : '');
          setDataAgendamento(response.data.data_agendamento ? new Date(response.data.data_agendamento).toISOString().slice(0, 16) : '');
          setPrazoExecucao(response.data.prazo_execucao ? new Date(response.data.prazo_execucao).toISOString().slice(0, 16) : '');
          setDescricaoProblema(response.data.descricao_problema);
          setStatusId(response.data.status_id);
          setObservacoesGerais(response.data.observacoes_gerais);
        })
        .catch(e => {
          setMessage('Erro ao carregar Ordem de Serviço: ' + e.message);
          console.log(e);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    const data = {
      numero_os: numeroOs,
      cliente_id: clienteId,
      loja_id: lojaId,
      tecnico_id: tecnicoId || null,
      tipo_servico: tipoServico,
      prioridade: prioridade,
      data_abertura: dataAbertura,
      data_agendamento: dataAgendamento || null,
      prazo_execucao: prazoExecucao || null,
      descricao_problema: descricaoProblema,
      status_id: statusId,
      observacoes_gerais: observacoesGerais,
    };

    if (id) {
      OrdemServicoService.updateOrdemServico(id, data.numero_os, data.cliente_id, data.loja_id, data.tecnico_id, data.tipo_servico, data.prioridade, data.data_abertura, data.data_agendamento, data.prazo_execucao, data.descricao_problema, data.status_id, data.observacoes_gerais)
        .then(response => {
          setMessage('Ordem de Serviço atualizada com sucesso!');
          navigate('/ordem-servicos');
        })
        .catch(e => {
          setMessage('Erro ao atualizar Ordem de Serviço: ' + e.message);
          console.log(e);
        });
    } else {
      OrdemServicoService.createOrdemServico(data.numero_os, data.cliente_id, data.loja_id, data.tecnico_id, data.tipo_servico, data.prioridade, data.data_abertura, data.data_agendamento, data.prazo_execucao, data.descricao_problema, data.status_id, data.observacoes_gerais)
        .then(response => {
          setMessage('Ordem de Serviço criada com sucesso!');
          navigate('/ordem-servicos');
        })
        .catch(e => {
          setMessage('Erro ao criar Ordem de Serviço: ' + e.message);
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
      <h4>{id ? 'Editar Ordem de Serviço' : 'Adicionar Ordem de Serviço'}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="numeroOs">Número da OS</label>
          <input
            type="text"
            className="form-control"
            id="numeroOs"
            required
            value={numeroOs}
            onChange={(e) => setNumeroOs(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="clienteId">Cliente</label>
          <select
            className="form-control"
            id="clienteId"
            required
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          >
            <option value="">Selecione um Cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="lojaId">Loja</label>
          <select
            className="form-control"
            id="lojaId"
            required
            value={lojaId}
            onChange={(e) => setLojaId(e.target.value)}
          >
            <option value="">Selecione uma Loja</option>
            {lojas.map((loja) => (
              <option key={loja.id} value={loja.id}>
                {loja.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tecnicoId">Técnico</label>
          <select
            className="form-control"
            id="tecnicoId"
            value={tecnicoId}
            onChange={(e) => setTecnicoId(e.target.value)}
          >
            <option value="">Selecione um Técnico</option>
            {/* TODO: Mapear técnicos (usuários) aqui */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tipoServico">Tipo de Serviço</label>
          <input
            type="text"
            className="form-control"
            id="tipoServico"
            required
            value={tipoServico}
            onChange={(e) => setTipoServico(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="prioridade">Prioridade</label>
          <input
            type="text"
            className="form-control"
            id="prioridade"
            required
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataAbertura">Data de Abertura</label>
          <input
            type="datetime-local"
            className="form-control"
            id="dataAbertura"
            required
            value={dataAbertura}
            onChange={(e) => setDataAbertura(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataAgendamento">Data de Agendamento</label>
          <input
            type="datetime-local"
            className="form-control"
            id="dataAgendamento"
            value={dataAgendamento}
            onChange={(e) => setDataAgendamento(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="prazoExecucao">Prazo de Execução</label>
          <input
            type="datetime-local"
            className="form-control"
            id="prazoExecucao"
            value={prazoExecucao}
            onChange={(e) => setPrazoExecucao(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricaoProblema">Descrição do Problema</label>
          <textarea
            className="form-control"
            id="descricaoProblema"
            required
            value={descricaoProblema}
            onChange={(e) => setDescricaoProblema(e.target.value)}
            rows="3"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="statusId">Status</label>
          <input
            type="text"
            className="form-control"
            id="statusId"
            required
            value={statusId}
            onChange={(e) => setStatusId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="observacoesGerais">Observações Gerais</label>
          <textarea
            className="form-control"
            id="observacoesGerais"
            value={observacoesGerais}
            onChange={(e) => setObservacoesGerais(e.target.value)}
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success">
          {id ? 'Atualizar' : 'Salvar'}
        </button>
      </form>
    </div>
  );
};

export default OrdemServicoForm;