# Guia para Desenvolvedores

Este guia fornece instruções para desenvolvedores que desejam contribuir com o projeto, incluindo como configurar o ambiente de desenvolvimento, padrões de código, e como executar testes.

## Configuração do Ambiente

Siga estas etapas para configurar o ambiente de desenvolvimento em sua máquina local.

### Pré-requisitos

- **Docker e Docker Compose:** Certifique-se de ter o Docker e o Docker Compose instalados e em execução. Você pode encontrar as instruções de instalação na [documentação oficial do Docker](https://docs.docker.com/get-docker/).

### Passos de Configuração

1.  **Clonar o Repositório:**
    Se ainda não o fez, clone o repositório do projeto para a sua máquina local.

2.  **Configurar Variáveis de Ambiente do Backend:**
    Navegue até a pasta `backend` e crie uma cópia do arquivo `.env.example`:
    ```bash
    cd backend
    cp .env.example .env
    ```
    Este arquivo já está pré-configurado para se conectar ao banco de dados PostgreSQL que será executado no contêiner do Docker.

3.  **Gerar a Chave da Aplicação Laravel:**
    Ainda no diretório `backend`, execute o seguinte comando para gerar a chave da aplicação Laravel. Este comando usa o `docker-compose` para executar o `php artisan key:generate` dentro de um contêiner temporário.
    ```bash
    docker-compose run --rm backend php artisan key:generate
    ```

4.  **Construir e Iniciar os Contêineres:**
    Volte para o diretório raiz do projeto e use o `docker-compose` para construir as imagens e iniciar os contêineres em modo detached (`-d`).
    ```bash
    cd ..
    docker-compose up --build -d
    ```

5.  **Instalar Dependências do Composer:**
    Execute o `composer install` dentro do contêiner do backend para instalar as dependências do PHP.
    ```bash
    docker-compose exec backend composer install
    ```

6.  **Executar as Migrações do Banco de Dados:**
    Para criar as tabelas do banco de dados, execute as migrações do Laravel.
    ```bash
    docker-compose exec backend php artisan migrate
    ```

### Acessando a Aplicação

Após seguir estes passos, a aplicação estará disponível nos seguintes endereços:

-   **Frontend (React):** [http://localhost:3000](http://localhost:3000)
-   **Backend (API Laravel):** [http://localhost:8001](http://localhost:8001)

O banco de dados PostgreSQL estará acessível na porta `5432` da sua máquina local.

## Testes

O projeto inclui testes automatizados para garantir a qualidade e a funcionalidade do código. Siga as instruções abaixo para executá-los.

### Testes do Backend (Laravel)

Os testes do backend são escritos em PHP e utilizam o PHPUnit. Eles estão localizados nos diretórios `tests/Unit` (para testes unitários) e `tests/Feature` (para testes de integração).

Para executar todos os testes do backend, utilize o seguinte comando dentro do diretório raiz do projeto:

```bash
docker-compose exec backend php artisan test
```

### Testes do Frontend (React)

Os testes do frontend são escritos em JavaScript/TypeScript e utilizam o Jest e a React Testing Library. Eles são executados através do `react-scripts`.

Para executar todos os testes do frontend, utilize o seguinte comando dentro do diretório raiz do projeto:

```bash
docker-compose exec frontend npm test
```

## Contribuição

Valorizamos as contribuições da comunidade para melhorar o projeto Soluciomatica. Para contribuir, siga estas diretrizes:

1.  **Fork o Repositório:** Comece fazendo um fork do repositório principal para sua conta do GitHub.
2.  **Crie uma Branch:** Crie uma nova branch para suas alterações a partir da branch `main` (ou da branch de desenvolvimento atual).
    ```bash
    git checkout -b feature/sua-feature-name
    ```
3.  **Faça Suas Alterações:** Implemente suas alterações, garantindo que o código siga os padrões de estilo existentes e que os testes passem.
4.  **Testes:** Certifique-se de que todos os testes existentes continuem passando e adicione novos testes para cobrir suas alterações, se aplicável.
5.  **Commits:** Faça commits claros e concisos, com mensagens que descrevam bem suas alterações.
6.  **Pull Request:** Abra um Pull Request (PR) para a branch `main` (ou de desenvolvimento) do repositório original. Descreva suas alterações em detalhes no PR.

### Padrões de Código

-   Siga os padrões de código PSR-12 para PHP no backend.
-   Para o frontend React, siga as convenções de código React e utilize o ESLint para garantir a consistência.

### Revisão de Código

Seu Pull Request será revisado pela equipe do projeto. Esteja preparado para fazer ajustes com base no feedback recebido.
