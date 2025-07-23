import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8001/api/';

class OrdemServicoService {
  getAllOrdemServicos() {
    return axios.get(API_URL + 'ordem-servicos', { headers: authHeader() });
  }

  getOrdemServico(id) {
    return axios.get(API_URL + 'ordem-servicos/' + id, { headers: authHeader() });
  }

  createOrdemServico(numero_os, cliente_id, loja_id, tecnico_id, tipo_servico, prioridade, data_abertura, data_agendamento, prazo_execucao, descricao_problema, status_id, observacoes_gerais) {
    return axios.post(API_URL + 'ordem-servicos', {
      numero_os,
      cliente_id,
      loja_id,
      tecnico_id,
      tipo_servico,
      prioridade,
      data_abertura,
      data_agendamento,
      prazo_execucao,
      descricao_problema,
      status_id,
      observacoes_gerais
    }, { headers: authHeader() });
  }

  updateOrdemServico(id, numero_os, cliente_id, loja_id, tecnico_id, tipo_servico, prioridade, data_abertura, data_agendamento, prazo_execucao, descricao_problema, status_id, observacoes_gerais) {
    return axios.put(API_URL + 'ordem-servicos/' + id, {
      numero_os,
      cliente_id,
      loja_id,
      tecnico_id,
      tipo_servico,
      prioridade,
      data_abertura,
      data_agendamento,
      prazo_execucao,
      descricao_problema,
      status_id,
      observacoes_gerais
    }, { headers: authHeader() });
  }

  deleteOrdemServico(id) {
    return axios.delete(API_URL + 'ordem-servicos/' + id, { headers: authHeader() });
  }
}

export default new OrdemServicoService();