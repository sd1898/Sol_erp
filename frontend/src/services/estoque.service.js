import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8001/api/';

class EstoqueService {
  getAllEstoques() {
    return axios.get(API_URL + 'estoques', { headers: authHeader() });
  }

  getEstoque(id) {
    return axios.get(API_URL + 'estoques/' + id, { headers: authHeader() });
  }

  createEstoque(produto_id, loja_id, quantidade_atual, estoque_minimo, localizacao) {
    return axios.post(API_URL + 'estoques', {
      produto_id,
      loja_id,
      quantidade_atual,
      estoque_minimo,
      localizacao
    }, { headers: authHeader() });
  }

  updateEstoque(id, produto_id, loja_id, quantidade_atual, estoque_minimo, localizacao) {
    return axios.put(API_URL + 'estoques/' + id, {
      produto_id,
      loja_id,
      quantidade_atual,
      estoque_minimo,
      localizacao
    }, { headers: authHeader() });
  }

  deleteEstoque(id) {
    return axios.delete(API_URL + 'estoques/' + id, { headers: authHeader() });
  }
}

export default new EstoqueService();