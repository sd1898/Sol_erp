import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8001/api/';

class ContatoClienteService {
  getAllContatos() {
    return axios.get(API_URL + 'contato-clientes', { headers: authHeader() });
  }

  getContato(id) {
    return axios.get(API_URL + 'contato-clientes/' + id, { headers: authHeader() });
  }

  createContato(cliente_id, nome, telefone, email, cargo) {
    return axios.post(API_URL + 'contato-clientes', {
      cliente_id,
      nome,
      telefone,
      email,
      cargo
    }, { headers: authHeader() });
  }

  updateContato(id, cliente_id, nome, telefone, email, cargo) {
    return axios.put(API_URL + 'contato-clientes/' + id, {
      cliente_id,
      nome,
      telefone,
      email,
      cargo
    }, { headers: authHeader() });
  }

  deleteContato(id) {
    return axios.delete(API_URL + 'contato-clientes/' + id, { headers: authHeader() });
  }
}

export default new ContatoClienteService();