import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8001/api/';

class StatusOSService {
  getAllStatusOS() {
    return axios.get(API_URL + 'status-os', { headers: authHeader() });
  }

  getStatusOS(id) {
    return axios.get(API_URL + 'status-os/' + id, { headers: authHeader() });
  }

  createStatusOS(nome, descricao, finaliza_os) {
    return axios.post(API_URL + 'status-os', {
      nome,
      descricao,
      finaliza_os
    }, { headers: authHeader() });
  }

  updateStatusOS(id, nome, descricao, finaliza_os) {
    return axios.put(API_URL + 'status-os/' + id, {
      nome,
      descricao,
      finaliza_os
    }, { headers: authHeader() });
  }

  deleteStatusOS(id) {
    return axios.delete(API_URL + 'status-os/' + id, { headers: authHeader() });
  }
}

export default new StatusOSService();