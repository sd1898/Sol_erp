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
}

export default new AuthService();