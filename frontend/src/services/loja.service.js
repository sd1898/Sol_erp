import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8001/api/';

class LojaService {
  getAllLojas() {
    return axios.get(API_URL + 'lojas', { headers: authHeader() });
  }

  getLoja(id) {
    return axios.get(API_URL + 'lojas/' + id, { headers: authHeader() });
  }

  createLoja(nome, cnpj, endereco, telefone, email_contato, horario_funcionamento, status) {
    return axios.post(API_URL + 'lojas', {
      nome,
      cnpj,
      endereco,
      telefone,
      email_contato,
      horario_funcionamento,
      status
    }, { headers: authHeader() });
  }

  updateLoja(id, nome, cnpj, endereco, telefone, email_contato, horario_funcionamento, status) {
    return axios.put(API_URL + 'lojas/' + id, {
      nome,
      cnpj,
      endereco,
      telefone,
      email_contato,
      horario_funcionamento,
      status
    }, { headers: authHeader() });
  }

  deleteLoja(id) {
    return axios.delete(API_URL + 'lojas/' + id, { headers: authHeader() });
  }
}

export default new LojaService();