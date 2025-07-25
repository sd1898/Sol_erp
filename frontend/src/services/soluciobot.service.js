import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8001/api/';

class SolucioBotService {
  analyzeData(data) {
    return axios.post(API_URL + 'soluciobot/analyze', data, { headers: authHeader() });
  }
}

export default new SolucioBotService();