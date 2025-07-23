# Arquitetura do Sistema

Esta seção detalha a arquitetura do sistema ERP Soluciomatica.

## Diagrama de Arquitetura

```mermaid
graph TD
    subgraph Frontend (Interface do Usuário)
        A[Web App - Desktop] -->|Acesso via Browser| B(Serviço de Autenticação)
        C[Mobile App - Técnicos] -->|API REST (Online/Offline)| B
    end

    subgraph Backend (Lógica de Negócio e APIs)
        B --> D[API Gateway/Load Balancer]
        D --> E[Serviço de Usuários & Permissões]
        D --> F[Serviço de Lojas & Multiloja]
        D --> G[Serviço de Clientes (CRM)]
        D --> H[Serviço de Produtos & Estoque]
        H --> I[Serviço de Transferência de Estoque]
        D --> J[Serviço de Ordem de Serviço (OS)]
        J --> K[Serviço de Agendamento & Rotas]
        J --> L[Serviço de Anexos & Assinatura Digital]
        D --> M[Serviço de Faturamento & Financeiro]
        M --> N[Serviço de RH & Folha de Pagamento]
        D --> O[Serviço de Comunicação (Chat/WhatsApp)]
        O --> P[Serviço de IA (SolucioBot)]
        D --> Q[Serviço de Relatórios & Dashboards]
    end

    subgraph Banco de Dados
        E,F,G,H,I,J,K,L,M,N,O,P,Q --> R(Banco de Dados Relacional - PostgreSQL/MySQL)
        P --> S(Banco de Dados NoSQL - MongoDB para dados não estruturados/logs de IA)
    end

    subgraph Integrações Externas
        K --> T[API Google Maps/Waze]
        O --> U[API WhatsApp (via provedor de serviço)]
        M,N --> V[APIs de Sistemas Financeiros/Contábeis]
    end

    subgraph Infraestrutura (Cloud - AWS/GCP/Azure)
        W[Servidores de Aplicação]
        X[Servidores de Banco de Dados]
        Y[Storage de Arquivos (S3/GCS)]
        Z[Serviços de Cache/Fila (Redis/Kafka)]

        B,D,E,F,G,H,I,J,K,L,M,N,O,P,Q --> W
        R,S --> X
        L --> Y
        W --> Z
    end
```
