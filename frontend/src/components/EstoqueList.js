import React, { useState, useEffect } from 'react';
import EstoqueService from '../services/estoque.service';
import { Link } from 'react-router-dom';

const EstoqueList = () => {
  const [estoques, setEstoques] = useState([]);
  const [produtosServicos, setProdutosServicos] = useState([]);
  const [lojas, setLojas] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Promise.all([
      EstoqueService.getAllEstoques(),
      EstoqueService.getAllProdutoServicos(),
      EstoqueService.getAllLojas()
    ])
      .then(([estoquesResponse, produtosResponse, lojasResponse]) => {
        setEstoques(estoquesResponse.data);
        setProdutosServicos(produtosResponse.data);
        setLojas(lojasResponse.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar dados: ' + e.message);
        console.log(e);
      });
  }, []);

  const getProdutoNome = (id) => {
    const produto = produtosServicos.find(p => p.id === id);
    return produto ? produto.nome : 'Desconhecido';
  };

  const getLojaNome = (id) => {
    const loja = lojas.find(l => l.id === id);
    return loja ? loja.nome : 'Desconhecida';
  };

  const deleteEstoque = (id) => {
    EstoqueService.deleteEstoque(id)
      .then(response => {
        setMessage('Item de estoque excluído com sucesso!');
        // Recarrega todos os dados após a exclusão
        Promise.all([
          EstoqueService.getAllEstoques(),
          EstoqueService.getAllProdutoServicos(),
          EstoqueService.getAllLojas()
        ])
          .then(([estoquesResponse, produtosResponse, lojasResponse]) => {
            setEstoques(estoquesResponse.data);
            setProdutosServicos(produtosResponse.data);
            setLojas(lojasResponse.data);
          })
          .catch(e => {
            setMessage('Erro ao carregar dados após exclusão: ' + e.message);
            console.log(e);
          });
      })
      .catch(e => {
        setMessage('Erro ao excluir item de estoque: ' + e.message);
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>Lista de Estoques</h4>
        <div className="mb-3">
          <Link to={'/estoques/add'} className="btn btn-primary">
            Adicionar Item de Estoque
          </Link>
        </div>
        <ul className="list-group">
          {estoques &&
            estoques.map((item, index) => (
              <li
                className="list-group-item"
                key={index}
              >
                Produto: {getProdutoNome(item.produto_id)} - Loja: {getLojaNome(item.loja_id)} - Qtd: {item.quantidade_atual}
                <div className="float-right">
                  <Link
                    to={'/estoques/' + item.id}
                    className="badge badge-warning mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="badge badge-danger"
                    onClick={() => deleteEstoque(item.id)}
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

export default EstoqueList;