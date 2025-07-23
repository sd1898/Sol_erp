import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8001/api/';

class PerfilService {
  getAllPerfis() {
    return axios.get(API_URL + 'perfil-permissoes', { headers: authHeader() });
  }

  getPerfil(id) {
    return axios.get(API_URL + 'perfil-permissoes/' + id, { headers: authHeader() });
  }

  createPerfil(nome_perfil, permissoes_json) {
    return axios.post(API_URL + 'perfil-permissoes', {
      nome_perfil,
      permissoes_json
    }, { headers: authHeader() });
  }

  updatePerfil(id, nome_perfil, permissoes_json) {
    return axios.put(API_URL + 'perfil-permissoes/' + id, {
      nome_perfil,
      permissoes_json
    }, { headers: authHeader() });
  }

  deletePerfil(id) {
    return axios.delete(API_URL + 'perfil-permissoes/' + id, { headers: authHeader() });
  }
}

export default new PerfilService();