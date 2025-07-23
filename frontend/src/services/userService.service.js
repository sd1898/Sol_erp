import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8001/api/';

class UserService {
  getAllUsers() {
    return axios.get(API_URL + 'users', { headers: authHeader() });
  }

  // Você pode adicionar mais métodos aqui para buscar usuários por perfil, etc.
}

export default new UserService();