# ERP Soluciomatica

Este é o repositório para o projeto ERP Soluciomatica, um sistema de gestão de Ordens de Serviço (OS) multiloja com assistente de IA.

## Visão Geral

O ERP Soluciomatica é um sistema SaaS (Software as a Service) inovador, modular e escalável, focado em otimizar a gestão de Ordens de Serviço (OS) para empresas com múltiplas unidades físicas. Ele integra funcionalidades avançadas como gestão multiloja, controle de estoque por unidade, Recursos Humanos, comunicação aprimorada e um assistente de Inteligência Artificial (SolucioBot) para análise de dados e automação.

## Documentação

A documentação detalhada do projeto pode ser encontrada na pasta `/docs`:

- **Arquitetura:** `docs/ARCHITECTURE.md`
- **Esquema do Banco de Dados:** `docs/DATABASE_SCHEMA.md`
- **Documentação da API:** `docs/API_DOCS.md`
- **Manual do Usuário:** `docs/USER_MANUAL.md`
- **Guia do Desenvolvedor:** `docs/DEVELOPER_GUIDE.md`

## Pré-requisitos

- Docker
- Docker Compose
- Node.js (para desenvolvimento do frontend)
- PHP (para desenvolvimento do backend)
- Composer (para gerenciamento de dependências do PHP)

## Instalação

1.  Clone o repositório: `git clone https://github.com/sd1898/Sol_erp.git`
2.  Navegue até o diretório do projeto: `cd Sol_erp`
3.  Instale as dependências do backend: `composer install`
4.  Instale as dependências do frontend: `npm install`
5.  Copie o arquivo de ambiente do backend: `cp backend/.env.example backend/.env`
6.  Gere a chave do aplicativo Laravel: `php artisan key:generate`

## Uso

1.  Inicie os contêineres do Docker: `docker-compose up -d`
2.  O frontend estará disponível em `http://localhost:3000`
3.  O backend estará disponível em `http://localhost:8001`
4.  O SolucioBot AI estará disponível em `http://localhost:5000`

## Contribuindo

Contribuições são bem-vindas! Por favor, siga estas etapas:

1.  Faça um fork do projeto.
2.  Crie uma nova branch: `git checkout -b minha-feature`
3.  Faça suas alterações e faça o commit: `git commit -m 'feat: Minha nova feature'`
4.  Envie para a branch original: `git push origin minha-feature`
5.  Crie um pull request.
