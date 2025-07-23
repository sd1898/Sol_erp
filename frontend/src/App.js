import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import './Auth.css'; // Adicionar um arquivo CSS para estilos de autenticação

import AuthService from './services/auth.service';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home'; // Novo componente Home
import PerfilPermissaoList from './components/PerfilPermissaoList';
import PerfilPermissaoForm from './components/PerfilPermissaoForm';
import LojaList from './components/LojaList';
import LojaForm from './components/LojaForm';
import ClienteList from './components/ClienteList';
import ClienteForm from './components/ClienteForm';
import ContatoClienteList from './components/ContatoClienteList';
import ContatoClienteForm from './components/ContatoClienteForm';
import ProdutoServicoList from './components/ProdutoServicoList';
import ProdutoServicoForm from './components/ProdutoServicoForm';
import EstoqueList from './components/EstoqueList';
import EstoqueForm from './components/EstoqueForm';
import OrdemServicoList from './components/OrdemServicoList';
import OrdemServicoForm from './components/OrdemServicoForm';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={'/'} className="navbar-brand">
            Sol ERP
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={'/home'} className="nav-link">
                Home
              </Link>
            </li>
            {currentUser && (
              <>
                <li className="nav-item">
                  <Link to={'/perfil-permissoes'} className="nav-link">
                    Perfis de Permissão
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/lojas'} className="nav-link">
                    Lojas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/clientes'} className="nav-link">
                    Clientes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/produtos-servicos'} className="nav-link">
                    Produtos/Serviços
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/estoques'} className="nav-link">
                    Estoque
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/ordem-servicos'} className="nav-link">
                    Ordens de Serviço
                  </Link>
                </li>
              </>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={'/profile'} className="nav-link">
                  {currentUser.user.name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Sair
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={'/login'} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/register'} className="nav-link">
                  Registrar
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfil-permissoes" element={<PerfilPermissaoList />} />
            <Route path="/perfil-permissoes/add" element={<PerfilPermissaoForm />} />
            <Route path="/perfil-permissoes/:id" element={<PerfilPermissaoForm />} />
            <Route path="/lojas" element={<LojaList />} />
            <Route path="/lojas/add" element={<LojaForm />} />
            <Route path="/lojas/:id" element={<LojaForm />} />
            <Route path="/clientes" element={<ClienteList />} />
            <Route path="/clientes/add" element={<ClienteForm />} />
            <Route path="/clientes/:id" element={<ClienteForm />} />
            <Route path="/clientes/:clienteId/contatos" element={<ContatoClienteList />} />
            <Route path="/clientes/:clienteId/contatos/add" element={<ContatoClienteForm />} />
            <Route path="/clientes/:clienteId/contatos/:contatoId" element={<ContatoClienteForm />} />
            <Route path="/produtos-servicos" element={<ProdutoServicoList />} />
            <Route path="/produtos-servicos/add" element={<ProdutoServicoForm />} />
            <Route path="/produtos-servicos/:id" element={<ProdutoServicoForm />} />
            <Route path="/estoques" element={<EstoqueList />} />
            <Route path="/estoques/add" element={<EstoqueForm />} />
            <Route path="/estoques/:id" element={<EstoqueForm />} />
            <Route path="/ordem-servicos" element={<OrdemServicoList />} />
            <Route path="/ordem-servicos/add" element={<OrdemServicoForm />} />
            <Route path="/ordem-servicos/:id" element={<OrdemServicoForm />} />
            {/* Adicione outras rotas aqui conforme o desenvolvimento */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;