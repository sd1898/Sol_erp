import React, { useState } from 'react';
import SolucioBotService from '../services/soluciobot.service';

const SolucioBotTest = () => {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [message, setMessage] = useState('');

  const handleAnalyze = () => {
    setMessage('');
    setResponse(null);

    SolucioBotService.analyzeData({ text: inputData })
      .then(res => {
        setResponse(res.data);
        setMessage('Análise do SolucioBot recebida!');
      })
      .catch(error => {
        setMessage('Erro ao analisar dados com SolucioBot: ' + (error.response?.data?.error || error.message));
        console.error('Erro ao analisar dados com SolucioBot:', error);
      });
  };

  return (
    <div className="container mt-3">
      <h4>Teste de Comunicação com SolucioBot AI</h4>
      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}
      <div className="form-group">
        <label htmlFor="inputData">Dados para Análise:</label>
        <textarea
          className="form-control"
          id="inputData"
          rows="5"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleAnalyze}>
        Analisar com SolucioBot
      </button>

      {response && (
        <div className="mt-4">
          <h5>Resposta do SolucioBot:</h5>
          <pre className="bg-light p-3 rounded">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SolucioBotTest;