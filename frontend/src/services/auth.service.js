import axios from 'axios';

const API_URL = 'http://localhost:8001/api/';

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + 'login', {
        email,
        password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
    // Em um cenário real, você também faria uma chamada para a API de logout do backend aqui
    // return axios.post(API_URL + 'logout');
  }

  register(name, email, password, password_confirmation) {
    return axios.post(API_URL + 'register', {
      name,
      email,
      password,
      password_confirmation
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getAllUsers() {
    const user = this.getCurrentUser();
    if (user && user.access_token) {
      return axios.get(API_URL + 'users', { headers: { Authorization: 'Bearer ' + user.access_token } });
    } else {
      return Promise.reject('No access token found');
    }
  }

  getUser(id) {
    const user = this.getCurrentUser();
    if (user && user.access_token) {
      return axios.get(API_URL + 'users/' + id, { headers: { Authorization: 'Bearer ' + user.access_token } });
    } else {
      return Promise.reject('No access token found');
    }
  }

  updateUser(id, name, email, password, perfil_permissao_id) {
    const user = this.getCurrentUser();
    if (user && user.access_token) {
      return axios.put(API_URL + 'users/' + id, {
        name,
        email,
        password,
        perfil_permissao_id
      }, { headers: { Authorization: 'Bearer ' + user.access_token } });
    } else {
      return Promise.reject('No access token found');
    }
  }
}

export default new AuthService();