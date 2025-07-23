import React, { useState, useEffect } from 'react';
import EstoqueService from '../services/estoque.service';
import ProdutoServicoService from '../services/produtoServico.service';
import LojaService from '../services/loja.service';
import { useParams, useNavigate } from 'react-router-dom';

const EstoqueForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [produtoId, setProdutoId] = useState('');
  const [lojaId, setLojaId] = useState('');
  const [quantidadeAtual, setQuantidadeAtual] = useState('');
  const [estoqueMinimo, setEstoqueMinimo] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [lojas, setLojas] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    ProdutoServicoService.getAllProdutoServicos()
      .then(response => {
        setProdutos(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar produtos para seleção: ' + e.message);
        console.log(e);
      });

    LojaService.getAllLojas()
      .then(response => {
        setLojas(response.data);
      })
      .catch(e => {
        setMessage('Erro ao carregar lojas para seleção: ' + e.message);
        console.log(e);
      });

    if (id) {
      EstoqueService.getEstoque(id)
        .then(response => {
          setProdutoId(response.data.produto_id);
          setLojaId(response.data.loja_id);
          setQuantidadeAtual(response.data.quantidade_atual);
          setEstoqueMinimo(response.data.estoque_minimo);
          setLocalizacao(response.data.localizacao);
        })
        .catch(e => {
          setMessage('Erro ao carregar item de estoque: ' + e.message);
          console.log(e);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    const data = {
      produto_id: produtoId,
      loja_id: lojaId,
      quantidade_atual: quantidadeAtual,
      estoque_minimo: estoqueMinimo === '' ? null : Number(estoqueMinimo),
      localizacao: localizacao,
    };

    if (id) {
      EstoqueService.updateEstoque(id, data.produto_id, data.loja_id, data.quantidade_atual, data.estoque_minimo, data.localizacao)
        .then(response => {
          setMessage('Item de estoque atualizado com sucesso!');
          navigate('/estoques');
        })
        .catch(e => {
          setMessage('Erro ao atualizar item de estoque: ' + e.message);
          console.log(e);
        });
    } else {
      EstoqueService.createEstoque(data.produto_id, data.loja_id, data.quantidade_atual, data.estoque_minimo, data.localizacao)
        .then(response => {
          setMessage('Item de estoque criado com sucesso!');
          navigate('/estoques');
        })
        .catch(e => {
          setMessage('Erro ao criar item de estoque: ' + e.message);
          console.log(e);
        });
    }
  };

  return (
    <div className="submit-form">
      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}
      <h4>{id ? 'Editar Item de Estoque' : 'Adicionar Item de Estoque'}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="produtoId">Produto/Serviço</label>
          <select
            className="form-control"
            id="produtoId"
            required
            value={produtoId}
            onChange={(e) => setProdutoId(e.target.value)}
          >
            <option value="">Selecione um Produto/Serviço</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="lojaId">Loja</label>
          <select
            className="form-control"
            id="lojaId"
            required
            value={lojaId}
            onChange={(e) => setLojaId(e.target.value)}
          >
            <option value="">Selecione uma Loja</option>
            {lojas.map((loja) => (
              <option key={loja.id} value={loja.id}>
                {loja.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantidadeAtual">Quantidade Atual</label>
          <input
            type="number"
            className="form-control"
            id="quantidadeAtual"
            required
            value={quantidadeAtual}
            onChange={(e) => setQuantidadeAtual(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="estoqueMinimo">Estoque Mínimo</label>
          <input
            type="number"
            className="form-control"
            id="estoqueMinimo"
            value={estoqueMinimo}
            onChange={(e) => setEstoqueMinimo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="localizacao">Localização</label>
          <input
            type="text"
            className="form-control"
            id="localizacao"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success">
          {id ? 'Atualizar' : 'Salvar'}
        </button>
      </form>
    </div>
  );
};

export default EstoqueForm;