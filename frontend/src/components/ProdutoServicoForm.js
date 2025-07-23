import React, { useState, useEffect } from 'react';
import ProdutoServicoService from '../services/produtoServico.service';
import { useParams, useNavigate } from 'react-router-dom';

const ProdutoServicoForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [custo, setCusto] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [impostos, setImpostos] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipoItem, setTipoItem] = useState('Produto');
  const [status, setStatus] = useState('ativo');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      ProdutoServicoService.getProdutoServico(id)
        .then(response => {
          setNome(response.data.nome);
          setDescricao(response.data.descricao);
          setPrecoVenda(response.data.preco_venda);
          setCusto(response.data.custo);
          setUnidadeMedida(response.data.unidade_medida);
          setCodigoBarras(response.data.codigo_barras);
          setImpostos(response.data.impostos);
          setCategoria(response.data.categoria);
          setTipoItem(response.data.tipo_item);
          setStatus(response.data.status);
        })
        .catch(e => {
          setMessage('Erro ao carregar produto/serviço: ' + e.message);
          console.log(e);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    const data = {
      nome,
      descricao,
      preco_venda: precoVenda,
      custo,
      unidade_medida: unidadeMedida,
      codigo_barras: codigoBarras,
      impostos,
      categoria,
      tipo_item: tipoItem,
      status,
    };

    if (id) {
      ProdutoServicoService.updateProdutoServico(id, data.nome, data.descricao, data.preco_venda, data.custo, data.unidade_medida, data.codigo_barras, data.impostos, data.categoria, data.tipo_item, data.status)
        .then(response => {
          setMessage('Produto/Serviço atualizado com sucesso!');
          navigate('/produtos-servicos');
        })
        .catch(e => {
          setMessage('Erro ao atualizar produto/serviço: ' + e.message);
          console.log(e);
        });
    } else {
      ProdutoServicoService.createProdutoServico(data.nome, data.descricao, data.preco_venda, data.custo, data.unidade_medida, data.codigo_barras, data.impostos, data.categoria, data.tipo_item, data.status)
        .then(response => {
          setMessage('Produto/Serviço criado com sucesso!');
          navigate('/produtos-servicos');
        })
        .catch(e => {
          setMessage('Erro ao criar produto/serviço: ' + e.message);
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
      <h4>{id ? 'Editar Produto/Serviço' : 'Adicionar Produto/Serviço'}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            className="form-control"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows="3"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="precoVenda">Preço de Venda</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="precoVenda"
            required
            value={precoVenda}
            onChange={(e) => setPrecoVenda(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="custo">Custo</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="custo"
            value={custo}
            onChange={(e) => setCusto(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="unidadeMedida">Unidade de Medida</label>
          <input
            type="text"
            className="form-control"
            id="unidadeMedida"
            value={unidadeMedida}
            onChange={(e) => setUnidadeMedida(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="codigoBarras">Código de Barras</label>
          <input
            type="text"
            className="form-control"
            id="codigoBarras"
            value={codigoBarras}
            onChange={(e) => setCodigoBarras(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="impostos">Impostos</label>
          <input
            type="text"
            className="form-control"
            id="impostos"
            value={impostos}
            onChange={(e) => setImpostos(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria</label>
          <input
            type="text"
            className="form-control"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipoItem">Tipo de Item</label>
          <select
            className="form-control"
            id="tipoItem"
            value={tipoItem}
            onChange={(e) => setTipoItem(e.target.value)}
          >
            <option value="Produto">Produto</option>
            <option value="Servico">Serviço</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          {id ? 'Atualizar' : 'Salvar'}
        </button>
      </form>
    </div>
  );
};

export default ProdutoServicoForm;