import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8001/api/';

class ClienteService {
  getAllClientes() {
    return axios.get(API_URL + 'clientes', { headers: authHeader() });
  }

  getCliente(id) {
    return axios.get(API_URL + 'clientes/' + id, { headers: authHeader() });
  }

  createCliente(nome, cpf_cnpj, endereco, email, informacoes_contratuais, id_loja_cadastro) {
    return axios.post(API_URL + 'clientes', {
      nome,
      cpf_cnpj,
      endereco,
      email,
      informacoes_contratuais,
      id_loja_cadastro
    }, { headers: authHeader() });
  }

  updateCliente(id, nome, cpf_cnpj, endereco, email, informacoes_contratuais, id_loja_cadastro) {
    return axios.put(API_URL + 'clientes/' + id, {
      nome,
      cpf_cnpj,
      endereco,
      email,
      informacoes_contratuais,
      id_loja_cadastro
    }, { headers: authHeader() });
  }

  deleteCliente(id) {
    return axios.delete(API_URL + 'clientes/' + id, { headers: authHeader() });
  }
}

export default new ClienteService();