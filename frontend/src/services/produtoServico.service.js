import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8001/api/';

class ProdutoServicoService {
  getAllProdutoServicos() {
    return axios.get(API_URL + 'produto-servicos', { headers: authHeader() });
  }

  getProdutoServico(id) {
    return axios.get(API_URL + 'produto-servicos/' + id, { headers: authHeader() });
  }

  createProdutoServico(nome, descricao, preco_venda, custo, unidade_medida, codigo_barras, impostos, categoria, tipo_item, status) {
    return axios.post(API_URL + 'produto-servicos', {
      nome,
      descricao,
      preco_venda,
      custo,
      unidade_medida,
      codigo_barras,
      impostos,
      categoria,
      tipo_item,
      status
    }, { headers: authHeader() });
  }

  updateProdutoServico(id, nome, descricao, preco_venda, custo, unidade_medida, codigo_barras, impostos, categoria, tipo_item, status) {
    return axios.put(API_URL + 'produto-servicos/' + id, {
      nome,
      descricao,
      preco_venda,
      custo,
      unidade_medida,
      codigo_barras,
      impostos,
      categoria,
      tipo_item,
      status
    }, { headers: authHeader() });
  }

  deleteProdutoServico(id) {
    return axios.delete(API_URL + 'produto-servicos/' + id, { headers: authHeader() });
  }
}

export default new ProdutoServicoService();