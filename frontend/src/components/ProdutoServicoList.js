import React, { useState, useEffect } from 'react';
import ProdutoServicoService from '../services/produtoServico.service';
import { Link } from 'react-router-dom';

const ProdutoServicoList = () => {
  const [produtosServicos, setProdutosServicos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    retrieveProdutosServicos();
  }, []);

  const retrieveProdutosServicos = () => {
    ProdutoServicoService.getAllProdutoServicos()
      .then(response => {
        setProdutosServicos(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar produtos/serviços: ' + e.message);
        console.log(e);
      });
  };

  const deleteProdutoServico = (id) => {
    ProdutoServicoService.deleteProdutoServico(id)
      .then(response => {
        setMessage('Produto/Serviço excluído com sucesso!');
        retrieveProdutosServicos();
      })
      .catch(e => {
        setMessage('Erro ao excluir produto/serviço: ' + e.message);
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>Lista de Produtos e Serviços</h4>
        <div className="mb-3">
          <Link to={'/produtos-servicos/add'} className="btn btn-primary">
            Adicionar Produto/Serviço
          </Link>
        </div>
        <ul className="list-group">
          {produtosServicos &&
            produtosServicos.map((item, index) => (
              <li
                className="list-group-item"
                key={index}
              >
                {item.nome} ({item.tipo_item}) - R$ {item.preco_venda}
                <div className="float-right">
                  <Link
                    to={'/produtos-servicos/' + item.id}
                    className="badge badge-warning mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="badge badge-danger"
                    onClick={() => deleteProdutoServico(item.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
        </ul>
        {message && (
          <div className="alert alert-info mt-3" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProdutoServicoList;