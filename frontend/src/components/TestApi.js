import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TestApi() {
  const [message, setMessage] = useState('Carregando...');

  useEffect(() => {
    axios.get('http://localhost:8001/api/hello')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Erro ao buscar mensagem da API:', error);
        setMessage('Erro ao carregar mensagem.');
      });
  }, []);

  return (
    <div>
      <h2>Teste de Conexão com Backend</h2>
      <p>{message}</p>
    </div>
  );
}

export default TestApi;