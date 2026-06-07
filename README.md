# SenacPass - Frontend

## Solução IoT para Contabilização Automatizada de Presença Acadêmica

---

## 📋 Sumário

1. [Capa](#capa)
2. [Visão Geral do Projeto](#-visão-geral-do-projeto)
3. [Problema de Negócio](#-problema-de-negócio)
4. [Objetivos](#-objetivos)
5. [Proposta de Valor](#-proposta-de-valor)
6. [Persona Principal](#-persona-principal)
7. [Jornada do Usuário](#-jornada-do-usuário)
8. [Requisitos Funcionais](#-requisitos-funcionais)
9. [Requisitos Não Funcionais](#-requisitos-não-funcionais)
10. [Arquitetura da Solução](#-arquitetura-da-solução)
11. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
12. [Estrutura de Pastas](#-estrutura-de-pastas)
13. [Instalação e Configuração](#-instalação-e-configuração)
14. [Configuração de Ambiente](#-configuração-de-ambiente)
15. [Segurança da Informação](#-segurança-da-informação)
16. [Cloud Computing](#-cloud-computing)
17. [Internet das Coisas](#-internet-das-coisas)
18. [Qualidade de Software](#-qualidade-de-software)
19. [Análise e Projeto de Sistemas](#-análise-e-projeto-de-sistemas)
20. [Tech English 4 - Project Summary](#-tech-english-4---project-summary)
21. [Mapeamento das Unidades Curriculares](#-mapeamento-das-unidades-curriculares)
22. [Dossiê de Evidências](#-dossiê-de-evidências)
23. [Demonstração](#-demonstração)
24. [Equipe](#-equipe)
25. [Marcas Formativas Senac](#-marcas-formativas-senac)
26. [Licença](#-licença)
27. [Agradecimentos](#-agradecimentos)
28. [Referências](#-referências)

---

## 🎓 CAPA

<div align="center">

# **SenacPass**

## Frontend - Solução IoT para Contabilização Automatizada de Presença Acadêmica

**Projeto Integrador**  
Faculdade Senac PE - Pernambuco

**Semestre:** 2026/1 (4° período)

**Curso:** Análise e Desenvolvimento de Sistemas

---

### 👥 Equipe Desenvolvedora

| Nome | Função |
|---|---|
| **Thayana Anália dos Santos Lira** | Gestora do Projeto |
| **Renato Trancoso Branco Delgado** | Desenvolvedor FullStack & Firmware IoT |
| **Vinicius Henrique Silva Nascimento** | Administrador de Banco de Dados (DBA) |
| **João Vitor Malveira da Silva** | Desenvolvedor Back-End |
| **Maria Clara de Melo** | Desenvolvedora Back-End |
| **João Victor Rodrigues Basante** | Desenvolvedor Front-End |


</div>

---

## 📖 Visão Geral do Projeto

### Contextualização

O **SenacPass** é uma solução inovadora de **Internet das Coisas (IoT)** desenvolvida como Projeto Integrador para a Faculdade Senac PE, que automatiza o controle de frequência em ambientes acadêmicos através de tecnologias de **RFID** (Identificação por Radiofrequência) e sensor de proximidade.

O projeto integra componentes de hardware (ESP32, RFID, sensores) com uma **arquitetura em camadas** que compreende:

- **Camada IoT:** Dispositivo físico que captura eventos de presença
- **Camada Backend:** API REST para processamento e persistência de dados
- **Camada Frontend:** Interface web responsiva para gestão, visualização e análise de dados

Este documento detalha especificamente a **camada Frontend**, responsável pela apresentação, interação com usuários e consulta dos dados processados pelo backend.

### Escopo do Frontend

O Frontend do SenacPass é uma **aplicação web moderna** desenvolvida com as seguintes responsabilidades:

- **Visualização de Dados:** Dashboards com indicadores de presença obtidos da API
- **Controle de Acesso:** Autenticação de professores por JWT
- **Relatórios e Análises:** Visualização de frequência, histórico de acessos e análises
- **Interatividade:** Interfaces intuitivas e responsivas para múltiplos dispositivos

---

## Problema de Negócio

### Dor Identificada

Instituições de ensino superior enfrentam **desafios críticos** no controle de frequência:

1. **Consumo de Tempo:** Professores gastam tempo valioso realizando chamadas manuais em cada aula
2. **Falta de Precisão:** Erros humanos resultam em registros incorretos de presença/ausência
3. **Dificuldade de Acompanhamento:** Coordenação acadêmica não possui visibilidade em tempo real da frequência
4. **Ineficiência Administrativa:** Necessidade de consolidação manual de dados de múltiplas turmas
5. **Falta de Rastreabilidade:** Dificuldade em auditar horários de entrada/saída de alunos

### Impacto

A **ineficiência do sistema atual** resulta em:

- Perda de tempo de aula em atividades administrativas
- Erro em registros manuais
- Gestão limitada de dados históricos e indicadores
- Experiência do usuário prejudicada tanto para alunos quanto para professores

---

## Objetivos

### Objetivo Geral

Desenvolver uma **solução web integrada** que automatize o controle de frequência acadêmica através de tecnologia IoT, fornecendo informações consultáveis com segurança, confiabilidade e boa experiência de usuário.

### Objetivos Específicos

#### 1. **Automatizar Registro de Presença**
   - Eliminar chamadas manuais através de RFID + sensor de aproximação
   - Registrar automaticamente check-in e check-out de alunos
   - Vincular registros a aulas, turmas e salas específicas

#### 2. **Fornecer Visualização em Tempo Real**
   - Criar dashboards que consultam os registros de presença da API
   - Mostrar indicadores de frequência por turma e aluno
   - Permitir visualização de dados históricos

#### 3. **Implementar Controle de Acesso**
   - Implementar autenticação para professores
   - Enviar o token JWT nas requisições protegidas
   - Preparar a aplicação para autorização por papéis em uma evolução futura

#### 4. **Facilitar Gestão Acadêmica**
   - Permitir criação e manutenção de alunos, turmas e aulas
   - Associar dispositivos IoT a salas específicas
   - Gerar relatórios de frequência

#### 5. **Garantir Qualidade e Segurança**
   - Implementar boas práticas de segurança (LGPD, proteção de dados)
   - Seguir padrões de código limpo e arquitetura
   - Aplicar testes e qualidade de software

#### 6. **Escalar para Infraestrutura em Nuvem**
   - Preparar aplicação para deployment em plataformas cloud
   - Configurar variáveis de ambiente para múltiplos contextos
   - Garantir portabilidade e independência de infraestrutura

---

## Proposta de Valor

### Valor para Professores

| Benefício | Impacto |
|-----------|--------|
| **Automação de Chamada** | Eliminação de tempo utilizado por tarefas administrativas em aula |
| **Dados em Tempo Real** | Visualização instantânea de quem chegou/saiu |
| **Relatórios Automáticos** | Geração automática de frequência sem digitação manual |
| **Redução de Erros** | Eliminação de erros humanos em registros |
| **Mais Tempo para Ensino** | Aproveitamento de tempo para atividades pedagógicas |

### Valor para Coordenação Acadêmica

| Benefício | Impacto |
|-----------|--------|
| **Visibilidade Integral** | Dashboard centralizado com frequência de todas as turmas |
| **Análises Avançadas** | Identificação de padrões de ausência e evasão |
| **Alertas Automáticos** | Notificação de alunos com baixa frequência |
| **Auditoria Completa** | Rastreabilidade de todos os acessos e horários |
| **Escalabilidade** | Suporta crescimento sem comprometer performance |

### Valor para Alunos

| Benefício | Impacto |
|-----------|--------|
| **Agilidade** | Check-in rápido (< 2 segundos) |
| **Transparência** | Visualização de seu próprio histórico de presença |
| **Confiabilidade** | Registro automático evita equívocos |
| **Experiência Moderna** | Interface intuitiva e amigável |

### Diferenciais Competitivos

1. **Automação Completa:** Eliminação de chamadas manuais
2. **Tecnologia IoT Integrada:** Uso de RFID + sensores para validação dupla
3. **Tempo Real:** Dashboards atualizam instantaneamente
4. **Segurança e Privacidade:** Alinhado com LGPD
5. **Escalabilidade:** Arquitetura cloud-ready
6. **Análises Inteligentes:** Indicadores e relatórios avançados

---

## Persona Principal

### Professor Universitário - "Professor Carlos Souza"

#### Perfil Demográfico

| Aspecto | Descrição |
|--------|-----------|
| **Nome** | Carlos Souza |
| **Idade** | 46 anos |
| **Experiência** | 15 anos como docente |
| **Formação** | Mestre em Ciência da Computação |
| **Localização** | Recife, Pernambuco |
| **Familiaridade com Tech** | Avançada |

#### Características

- Ministra **3-4 unidades curriculares** por semestre
- Atua em **2-3 turmas** simultâneas
- Totalizando **100-150 alunos** sob sua responsabilidade
- Dedica **4-6 horas semanais** a atividades administrativas
- Possui **notebook pessoal** e acesso a computador em sala de aula

#### Dores e Desafios

1. **Consumo de Tempo:** Aulas de 50 min, mas 10 min gastos em chamada manual
2. **Erros Humanos:** Dificuldade em ouvir quem está presente em turmas grandes pode gerar erros
3. **Stress:** Responsabilidade de manter registros acurados

#### Necessidades

1. **Simplicidade:** Processo de chamada com máximo 30 segundos
2. **Confiabilidade:** Certeza de que dados foram registrados corretamente
3. **Acessibilidade:** Acesso a informações de qualquer dispositivo
4. **Relatórios:** Visualização rápida de frequência por aluno/turma
5. **Integração:** Funcionalidade deve integrar com infraestrutura existente

#### Jornada de Uso

```
Chegada à Aula
      ↓
Acessa Dashboard (smartphone/tablet)
      ↓     ↓
Alunos fazem Check-in (RFID)
      ↓
Visualiza os registros retornados pela API
      ↓
Acessa Relatório de Frequência
      ↓
Fim de Aula
```

---

## Jornada do Usuário

### Professor Realizando Chamada

#### Pré-Condições
- Professor está em sala de aula
- Dispositivo IoT está configurado e ativo na sala
- Alunos possuem cartões RFID

#### Fluxo Principal

| Etapa | Ação do Sistema | Ação do Usuário |
|-------|-----------------|-----------------|
| 1 | Sistema exibe dashboard da aula | Professor acessa aplicação |
| 2 | Dashboard lista aula em andamento e turma | Professor identifica sua aula |
| 3 | Sistema apresenta os dados obtidos na última consulta | - |
| 4 | Aluno aproxima cartão do dispositivo | Aluno faz check-in |
| 5 | LED verde e buzzer confirmam leitura | - |
| 6 | API Backend processa evento | - |
| 7 | Professor atualiza ou reabre o dashboard | Frontend consulta novamente a API |
| 8 | Professor visualiza "João Silva - Presente" | Professor confirma visualmente |
| 9 | Após 50 minutos, professor finaliza aula | - |
| 10 | Sistema calcula frequência final | Frequência é processada |

#### Resultado Esperado

✅ Todos os alunos presentes registrados automaticamente
✅ Professor visualiza a lista retornada pela API
✅ Frequência persiste no banco de dados
✅ Relatório está disponível para consulta posterior

---

## ✅ Requisitos Funcionais

### RF01 - Autenticação de Professores

**Descrição:** O sistema deve permitir que usuários façam login com credenciais seguras.

**Atores:** Professor

**Fluxo Principal:**
1. Usuário acessa página de login
2. Usuário insere email e senha
3. Sistema valida credenciais contra Backend
4. Sistema emite token JWT
5. Professor é redirecionado para o dashboard

**Critérios de Aceitação:**
- ✅ Validação de email com formato correto
- ⚠️ O backend ainda não implementa limite de tentativas
- ✅ O token emitido pelo backend possui duração atual de 8 horas

---

### RF02 - Visualização de Presença

**Descrição:** Sistema deve consultar a API e exibir a lista de presenças de uma aula.

**Atores:** Professor

**Fluxo Principal:**
1. Professor acessa dashboard da aula
2. Sistema consulta `GET /api/presencas/aula/:id_aula`
3. O professor pode atualizar ou trocar a aula selecionada
4. Nome do aluno e horário de check-in são exibidos

**Critérios de Aceitação:**
- ⚠️ Atualização por consulta REST; WebSocket/SSE ainda não estão implementados
- ✅ Indicador visual de presença/ausência
- ✅ Timestamp de entrada

---

### RF03 - Dashboard de Frequência

**Descrição:** Sistema deve exibir dashboards com indicadores de frequência.

**Atores:** Professor

**Fluxo Principal:**
1. Usuário acessa "Dashboard"
2. Sistema carrega dados de frequência
3. Gráficos e indicadores são renderizados
4. Dados podem ser consultados por turma e aula

**Critérios de Aceitação:**
- ✅ Gráficos com taxa de frequência
- ✅ Total de alunos presentes/ausentes
- ✅ Histórico de frequência por aluno
- ⚠️ Alertas automáticos de baixa frequência são evolução futura

---

### RF04 - Proteção de Rotas Autenticadas

**Descrição:** Sistema deve impedir o acesso às páginas internas quando não houver sessão de professor.

**Atores:** Sistema

**Fluxo Principal:**
1. Usuário faz login
2. Frontend armazena a sessão local
3. Requisições protegidas recebem `Authorization: Bearer <token>`
4. Rotas internas redirecionam usuários não autenticados para o login

**Critérios de Aceitação:**
- ✅ Professor autenticado acessa as páginas internas
- ⚠️ O backend ainda não implementa RBAC nem autorização por propriedade do recurso
- ⚠️ Perfis de coordenador e aluno são evolução futura

---

### RF05 - Integração com Backend

**Descrição:** Sistema deve integrar-se ao Backend por requisições HTTP REST.

**Atores:** Sistema

**Fluxo Principal:**
1. Frontend faz requisições HTTP para API
2. Backend processa e retorna dados
3. Frontend mantém os dados no estado dos componentes
4. Frontend atualiza componentes

**Critérios de Aceitação:**
- ✅ Requisições implementadas via Axios
- ✅ Tratamento básico de erros
- ⚠️ Retry automático e cache com invalidação ainda não estão implementados
- ⚠️ Timeout específico ainda não está configurado no cliente Axios

---

## Requisitos Não Funcionais

### RNF01 - Performance

**Descrição:** O sistema deve responder rapidamente a interações do usuário.

**Especificação:**
- Tempo de carregamento inicial: **< 3 segundos**
- Tempo de navegação entre páginas: **< 1 segundo**
- Atualização após resposta da API: meta de **< 2 segundos**
- Carregamento de listagens (100 itens): **< 2 segundos**

**Técnicas de Implementação:**
- Code splitting com Vite
- Lazy loading de componentes
- Caching de dados
- Otimização de renderização com React

---

### RNF02 - Escalabilidade

**Descrição:** Sistema deve suportar crescimento de usuários e dados.

**Especificação:**
- Suporte a **10.000+ alunos** simultâneos
- Suporte a **1.000+ aulas** por dia
- **1.000 eventos RFID** por minuto
- Infraestrutura **auto-escalável** em cloud

**Técnicas de Implementação:**
- Arquitetura componentizada e modular
- Preparação para múltiplos ambientes (dev, staging, prod)
- Variáveis de ambiente configuráveis
- Separação clara entre apresentação e lógica

---

### RNF03 - Segurança

**Descrição:** Dados devem estar protegidos contra acessos não autorizados.

**Especificação:**
- Autenticação via **JWT (JSON Web Tokens)**
- Rotas internas protegidas no frontend e endpoints protegidos por JWT no backend
- Comunicação via **HTTPS**
- Token e dados básicos da sessão armazenados atualmente em `localStorage`
- Tratamento de dados deve observar a **LGPD** (Lei Geral de Proteção de Dados)

**Técnicas de Implementação:**
- Validação de entrada em todas as requisições
- Sanitização de dados exibidos (XSS prevention)
- Planejamento de armazenamento de token mais seguro
- Rate limiting e RBAC como melhorias futuras do Backend
- Minimização de dados coletados

---

### RNF04 - Disponibilidade

**Descrição:** Sistema deve estar disponível continuamente.

**Especificação:**
- **Uptime: 99.5%** (máximo 3.6 horas de downtime/mês)
- Mensagens de erro quando a API estiver indisponível
- Graceful degradation em caso de Backend indisponível

**Técnicas de Implementação:**
- Tratamento de erros em todas as requisições HTTP
- Nova tentativa acionada pelo usuário em pontos da interface
- Mensagens informativas ao usuário
- Cache básico do shell da aplicação pelo Service Worker

---

### RNF05 - Usabilidade

**Descrição:** Interface deve ser intuitiva e acessível.

**Especificação:**
- Interface responsiva para **desktop, tablet, mobile**
- Contraste de cores **WCAG AA** (Acessibilidade)
- Feedback visual para todas as ações
- Documentação em português
- Support para navegadores modernos (Chrome, Firefox, Safari, Edge)

**Técnicas de Implementação:**
- Design responsivo com Styled Components
- Componentes reutilizáveis
- Ícones via Lucide React
- Testes de acessibilidade
- Validação de formulários com mensagens claras

---

### RNF06 - Manutenibilidade

**Descrição:** Código deve ser fácil de entender, modificar e expandir.

**Especificação:**
- Código seguindo padrão **ESLint**
- Tipagem completa com **TypeScript**
- Componentes bem documentados
- Estrutura de pastas organizada
- Testes unitários

**Técnicas de Implementação:**
- Linting automático
- Type checking em build time
- Componentes pequenos e focados
- Services separados da apresentação
- JSDoc para funções complexas

---

### RNF07 - Compatibilidade

**Descrição:** Sistema deve funcionar em múltiplos dispositivos e ambientes.

**Especificação:**
- Desktop: **1024x768 até 4K**
- Tablet: **iPad, Android tablets**
- Mobile: **iPhone, Android phones**
- Navegadores suportados: **Chrome, Firefox, Safari, Edge**

**Técnicas de Implementação:**
- Media queries CSS
- Viewport meta tags
- Componentes responsivos
- Testes em múltiplos dispositivos
- Progressive Web App (PWA)

---

### RNF08 - Recoverability (Recuperação)

**Descrição:** Sistema deve recuperar de falhas minimizando perda de dados.

**Especificação:**
- Sessão mantida por **30 minutos** de inatividade
- Persistência local da sessão do professor
- Recarga dos dados após nova consulta à API

**Técnicas de Implementação:**
- `localStorage` para a sessão atual
- Service Worker com cache básico da rota raiz
- Reconsulta da API ao recarregar a aplicação

---

## Arquitetura da Solução

### Arquitetura Geral (Visão Macro)

```
┌─────────────────────────────────────────────────────────────┐
│                      IoT & Sensores                         │
│             (ESP32 + RFID + Sensor HC-SR04)                 │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS/REST
                             ▼
┌─────────────────────────────────────────────────────────────┐
│              API REST - Azure App Service                  │
│      Processamento dos eventos e regras de negócio          │
└────────────────────────────┬────────────────────────────────┘
                             │ Conexão segura
                             ▼
┌─────────────────────────────────────────────────────────────┐
│ Azure Database for PostgreSQL - Flexible Server            │
│                 Persistência dos dados                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│       Frontend - Azure Static Web Apps (Este Projeto)       │
│              React + TypeScript + Styled Components         │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS/REST
                             ▼
                API REST - Azure App Service
```

### Ambientes Publicados

- **Aplicação web:** https://black-flower-0aa5e4810.7.azurestaticapps.net/
- **API REST:** https://senacpass-api-amc2eubab9emcxfu.centralus-01.azurewebsites.net/api/

### Arquitetura Frontend (Detalhada)

#### Camadas Principais

```
┌────────────────────────────────────────────────────┐
│            Camada de Apresentação (UI)             │
│  ┌──────────────────────────────────────────────┐  │
│  │  Componentes React                           │  │
│  │  • Pages (Dashboard, Relatórios, Gestão)     │  │
│  │  • Components reutilizáveis                  │  │
│  │  • Styled Components                         │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────┐
│          Camada de Lógica (Business Logic)         │
│  ┌──────────────────────────────────────────────┐  │
│  │  Contexts (React Context API)                │  │
│  │  • AuthContext para autenticação             │  │
│  │  • UserContext para dados do usuário         │  │
│  │  Hooks customizados                          │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────┐
│          Camada de Dados (Data Access)             │
│  ┌──────────────────────────────────────────────┐  │
│  │  Services (Axios, HTTP)                      │  │
│  │  • api.ts: requisições HTTP genéricas        │  │
│  │  • dashboard.ts: endpoints de dashboard      │  │
│  │  • resources.ts: endpoints de recursos       │  │
│  │  Cache local e sincronização                 │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────┐
│              Camada de Infraestrutura              │
│  ┌──────────────────────────────────────────────┐  │
│  │  API Backend (HTTP REST)                     │  │
│  │  Base URL: VITE_API_URL (incluindo /api)      │  │
│  │  Endpoints: /alunos, /turmas, /aulas, etc     │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### Estrutura de Diretórios e Responsabilidades

```
senacpass-frontend/
├── public/                   # Arquivos estáticos
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service Worker (cache offline)
│   └── icons/                # Ícones de aplicação
│
├── src/
│   ├── main.tsx              # Ponto de entrada
│   ├── App.tsx               # Componente raiz
│   ├── index.css             # Estilos globais
│   │
│   ├── components/           # Componentes reutilizáveis
│   │   ├── layout/
│   │   │   ├── Header/       # Cabeçalho com navegação
│   │   │   ├── Sidebar/      # Menu lateral
│   │   │   └── Layout/       # Layout base
│   │   └── ui/
│   │       └── EmptyState/   # Estado vazio genérico
│   │
│   ├── contexts/             # React Context (estado global)
│   │   └── AuthContext.tsx   # Autenticação e autorização
│   │
│   ├── modules/              # Features (agrupamento por funcionalidade)
│   │   ├── login/            # Módulo de autenticação
│   │   ├── dashboard/        # Módulo de dashboard
│   │   │   ├── components/   # Componentes específicos
│   │   │   │   ├── AlertCard/
│   │   │   │   ├── AlertsPanel/
│   │   │   │   ├── AuditPanel/
│   │   │   │   ├── CourseOverviewCard/
│   │   │   │   ├── DashboardHeader/
│   │   │   │   ├── DashboardModal/
│   │   │   │   ├── DevicePanel/
│   │   │   │   ├── PresenceChart/
│   │   │   │   └── StudentList/
│   │   │   ├── index.tsx     # Página principal
│   │   │   ├── styles.ts     # Estilos do módulo
│   │   │   ├── types.ts      # Tipos TypeScript
│   │   │   └── mock.ts       # Dados mock para desenvolvimento
│   │   ├── turmas/           # Gestão de turmas
│   │   ├── relatorios/       # Relatórios
│   │   ├── configuracoes/    # Configurações
│   │   └── iot/              # Painel IoT
│   │
│   ├── routes/               # Configuração de rotas
│   │   └── index.tsx         # React Router setup
│   │
│   ├── services/             # Serviços (API, HTTP)
│   │   ├── api.ts            # Configuração Axios
│   │   ├── dashboard.ts      # Endpoints de dashboard
│   │   └── resources.ts      # Endpoints genéricos
│   │
│   ├── styles/               # Estilos globais
│   │   ├── global.ts         # Estilos globais Styled Components
│   │   ├── theme.ts          # Tema de cores
│   │   └── styled.d.ts       # Type definitions para Styled
│   │
│   ├── utils/                # Funções utilitárias
│   └── assets/               # Imagens, fontes, etc
│
├── index.html                # HTML entry point
├── package.json              # Dependências
├── tsconfig.json             # Configuração TypeScript
├── vite.config.ts            # Configuração Vite
├── eslint.config.js          # Configuração ESLint
└── README.md                 # Documentação (este arquivo)
```

### Fluxo de Dados

```
Usuário Interage com UI
         │
         ▼
Evento no Componente React
         │
         ▼
Dispatch via Context / Hook
         │
         ▼
Service (api.ts, dashboard.ts)
         │
         ▼
Axios HTTP Request
         │
         ▼
API Backend
         │
         ▼
Backend processa / Banco de dados
         │
         ▼
Resposta JSON
         │
         ▼
Componente atualizado via State
         │
         ▼
Re-render e exibição ao usuário
```

### Contrato Atual com o Backend

A API local utiliza a base `http://localhost:3333/api`. No frontend, `VITE_API_URL` deve conter essa URL completa, incluindo `/api`.

| Operação | Endpoint |
|----------|----------|
| Login do professor | `POST /professores/login` |
| Turmas do professor | `GET /turmas/professor/:id_professor` |
| Aulas da turma | `GET /aulas/turma/:id_turma` |
| Aulas ativas do professor | `GET /professores/:id_professor/aulas-ativas` |
| Presenças da aula | `GET /presencas/aula/:id_aula` |
| Logs RFID | `GET /log-acessos` |
| Alunos, turmas, aulas, unidades, inscrições e dispositivos | Endpoints REST protegidos por Bearer JWT |

O backend mantém públicos, no estado atual, os endpoints de professores, presenças e logs de acesso. RBAC, autorização por propriedade do recurso e proteção completa desses endpoints ainda estão pendentes no backend.

### Padrões de Projeto Utilizados

#### 1. **Component Pattern**
Cada componente é uma unidade isolada, reutilizável e testável.

```
Component/
├── index.tsx      # Componente React
├── styles.ts      # Estilos Styled Components
└── types.ts       # Tipos TypeScript (se necessário)
```

#### 2. **Context Pattern**
Utilizado para estado global (autenticação, usuário).

```typescript
// AuthContext.tsx
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
```

#### 3. **Service Pattern**
Serviços encapsulam lógica de requisições HTTP.

```typescript
// services/dashboard.ts
export const dashboardService = {
  getPresenceData: (classId: string) => api.get(`/dashboard/${classId}`),
  getFrequencyReport: (filtros) => api.get('/reports/frequency', { params: filtros }),
};
```

#### 4. **Styled Components**
Estilos encapsulados em cada componente.

```typescript
// Component/styles.ts
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 16px;
`;
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend Stack

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **React** | 19.2.5 | Framework principal para UI |
| **TypeScript** | ~6.0.2 | Tipagem estática e qualidade |
| **Vite** | 8.0.10 | Build tool e dev server |
| **React Router DOM** | 7.14.2 | Roteamento client-side |
| **Styled Components** | 6.4.1 | CSS-in-JS para estilização |
| **Axios** | 1.17.0 | Cliente HTTP |
| **Recharts** | 3.8.1 | Gráficos e visualizações |
| **Lucide React** | 1.14.0 | Ícones SVG |

### Ferramentas de Desenvolvimento

| Ferramenta | Versão | Propósito |
|-----------|--------|----------|
| **ESLint** | 10.2.1 | Linting e qualidade de código |
| **TypeScript ESLint** | 8.58.2 | Linting específico TypeScript |
| **Node.js** | 18+ | Runtime JavaScript |
| **npm** | 9+ | Gerenciador de pacotes |

### Infraestrutura

| Componente | Descrição |
|-----------|-----------|
| **Frontend** | Aplicação React hospedada no Azure Static Web Apps |
| **Backend** | API REST hospedada no Azure App Service |
| **Banco de Dados** | Azure Database for PostgreSQL - Flexible Server |
| **Cloud Provider** | Microsoft Azure |

### Navegadores Suportados

| Navegador | Versão Mínima |
|-----------|--------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

---

## 📁 Estrutura de Pastas

A estrutura foi organizada seguindo o padrão **"Feature-based"** (agrupamento por funcionalidade):

```
senacpass-frontend/
│
├── public/                              # Arquivos estáticos servidos como-está
│   ├── manifest.json                    # PWA manifest para aplicação
│   ├── sw.js                            # Service Worker para cache offline
│   └── icons/                           # Ícones da aplicação
│
├── src/
│   ├── components/                      # Componentes reutilizáveis
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   │   ├── index.tsx            # Cabeçalho com navegação e logo
│   │   │   │   └── styles.ts            # Estilos do Header
│   │   │   ├── Sidebar/
│   │   │   │   ├── index.tsx            # Menu lateral de navegação
│   │   │   │   └── styles.ts            # Estilos da Sidebar
│   │   │   └── Layout/
│   │   │       ├── index.tsx            # Layout base (Header + Sidebar + Content)
│   │   │       └── styles.ts            # Estilos do Layout
│   │   └── ui/
│   │       └── EmptyState/
│   │           ├── index.tsx            # Componente para estados vazios
│   │           └── styles.ts
│   │
│   ├── contexts/                        # React Context (estado global)
│   │   └── AuthContext.tsx              # Contexto de autenticação e papéis
│   │
│   ├── modules/                         # Funcionalidades agrupadas (features)
│   │   ├── login/                       # Módulo de autenticação
│   │   │   ├── index.tsx                # Página de login
│   │   │   └── styles.ts                # Estilos
│   │   │
│   │   ├── dashboard/                   # Painel de controle principal
│   │   │   ├── components/
│   │   │   │   ├── AlertCard/           # Card de alerta (componente reutilizável)
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── AlertsPanel/         # Painel de alertas
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── AuditPanel/          # Painel de auditoria
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── CourseOverviewCard/  # Card de visão geral de turma
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── DashboardHeader/     # Cabeçalho específico dashboard
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── DashboardModal/      # Modal genérico do dashboard
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── DevicePanel/         # Painel com status dos dispositivos IoT
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── PresenceChart/       # Gráfico de presença (Recharts)
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   └── StudentList/         # Lista de alunos com presença
│   │   │   │       ├── index.tsx
│   │   │   │       └── styles.ts
│   │   │   ├── index.tsx                # Página principal do dashboard
│   │   │   ├── mock.ts                  # Dados mock para desenvolvimento
│   │   │   ├── styles.ts                # Estilos globais do módulo
│   │   │   └── types.ts                 # Tipos TypeScript do módulo
│   │   │
│   │   ├── turmas/                      # Gestão de turmas
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   │
│   │   ├── relatorios/                  # Módulo de relatórios
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   │
│   │   ├── configuracoes/               # Configurações da aplicação
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   │
│   │   └── iot/                         # Painel de gerenciamento IoT
│   │       ├── index.tsx
│   │       └── styles.ts
│   │
│   ├── routes/                          # Configuração de rotas
│   │   └── index.tsx                    # React Router setup com proteção de rota
│   │
│   ├── services/                        # Serviços (API, HTTP, Business Logic)
│   │   ├── api.ts                       # Configuração Axios (interceptadores, baseURL)
│   │   ├── dashboard.ts                 # Serviço específico para endpoints dashboard
│   │   └── resources.ts                 # Serviço genérico para CRUD de recursos
│   │
│   ├── styles/                          # Estilos globais
│   │   ├── global.ts                    # Reset CSS, estilos globais (Styled Components)
│   │   ├── theme.ts                     # Variáveis de tema (cores, tipografia)
│   │   └── styled.d.ts                  # Type definitions para Styled Components
│   │
│   ├── utils/                           # Funções utilitárias
│   │   └── [funções helpers, formatadores, validadores]
│   │
│   ├── assets/                          # Imagens, ícones, fontes, etc
│   │   └── [arquivos de mídia]
│   │
│   ├── App.tsx                          # Componente raiz da aplicação
│   ├── index.css                        # Estilos CSS base (alternativa a styled)
│   └── main.tsx                         # Ponto de entrada - React.createRoot
│
├── index.html                           # Arquivo HTML principal
├── package.json                         # Dependências e scripts npm
├── tsconfig.json                        # Configuração TypeScript base
├── tsconfig.app.json                    # Configuração TypeScript para aplicação
├── tsconfig.node.json                   # Configuração TypeScript para build tools
├── vite.config.ts                       # Configuração Vite
├── eslint.config.js                     # Configuração ESLint
├── README.md                            # Este arquivo
└── .env.example                         # Exemplo de variáveis de ambiente
```

### Princípios Organizacionais

1. **Separação de Responsabilidades:** Cada pasta tem uma responsabilidade clara
2. **Coesão:** Componentes relacionados estão próximos
3. **Escalabilidade:** Fácil adicionar novos módulos sem quebrar a estrutura
4. **Clareza:** Nomes descritivos facilitam navegação
5. **Padrão Consistente:** Cada componente segue estrutura similar

---

## Instalação e Configuração

### Pré-Requisitos

- **Node.js:** v18 ou superior
- **npm:** v9 ou superior (ou yarn v3+)
- **Git:** Para clonar repositório
- **Acesso a Backend:** URL da API REST (local ou cloud)
- **Editor:** VS Code, WebStorm ou similar

### Passo 1: Clonar Repositório

```bash
git clone https://github.com/renatodelgado/senacpass-frontend.git
cd senacpass-frontend
```

### Passo 2: Instalar Dependências

```bash
npm install
```

Isso instala todas as dependências listadas em `package.json`:
- React 19
- React Router
- Styled Components
- Axios
- Recharts
- TypeScript
- ESLint

### Passo 3: Configurar Variáveis de Ambiente

Criar arquivo `.env.local` (não será versionado):

```bash
cp .env.example .env.local
```

Editar `.env.local` com suas configurações:

```env
# Desenvolvimento (Backend local)
VITE_API_URL=http://localhost:3333/api
```

### Passo 4: Executar em Desenvolvimento

```bash
npm run dev
```

Aplicação será servida em:
- **URL:** http://localhost:5173
- **HMR:** Ativo (Hot Module Replacement)

### Passo 5: Build para Produção

```bash
npm run build
```

Gera arquivos otimizados em `dist/`:
- JavaScript minificado
- CSS otimizado
- Eliminação de código morto
- Source maps

### Passo 6: Preview de Produção (Local)

```bash
npm run preview
```

Servir localmente versão de produção para testes.

### Passo 7: Linting e Qualidade

```bash
npm run lint
```

Verifica qualidade do código com ESLint.

---

## Configuração de Ambiente

### Variáveis de Ambiente

#### Desenvolvimento

`.env.local`:
```env
# API Backend
VITE_API_URL=http://localhost:3333/api

# Modo debug
VITE_DEBUG=true
```

### Configuração Vite

`vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})
```

### Configuração TypeScript

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

---

## Segurança da Informação

### Princípios de Segurança Implementados

#### 1. **Autenticação Segura**

- Utilização de **JWT (JSON Web Tokens)** para autenticação stateless
- Token JWT armazenado atualmente em `localStorage`
- Expiração atual do token definida pelo backend em 8 horas
- O backend ainda não implementa refresh token

```typescript
// AuthContext.tsx
const login = async (email: string, password: string) => {
  const response = await api.post('/professores/login', {
    email,
    senha: password,
  });

  localStorage.setItem('token', response.data.token);
};
```

> O armazenamento em `localStorage` corresponde à implementação atual, mas aumenta o impacto de uma falha de XSS. Cookies `HttpOnly`, rotação de tokens e refresh token dependem de evolução coordenada com o backend.

#### 2. **Comunicação Segura (HTTPS)**

- Todas as requisições via **HTTPS** em produção
- Certificados SSL/TLS válidos
- HSTS (HTTP Strict Transport Security) habilitado

#### 3. **Proteção de Dados Sensíveis**

Minimização de dados coletados (conformidade LGPD):

```typescript
// ✅ Coletar apenas o necessário
const user = {
  id: string;
  email: string;
  name: string;
};

// ❌ Evitar
const user = {
  cpf: string;           // Não necessário
  rgIdentity: string;    // Não necessário
  phoneNumber: string;   // Não necessário
  dateOfBirth: string;   // Não necessário
};
```

#### 4. **Tratamento de Erros Seguro**

Evitar exposição de detalhes técnicos:

```typescript
// ❌ Inseguro
try {
  await api.get('/data');
} catch (error) {
  alert(error.response.data.message);  // Expõe detalhes
}

// ✅ Seguro
try {
  await api.get('/data');
} catch (error) {
  if (error.response?.status === 401) {
    redirectToLogin();
  } else {
    showGenericError();  // "Ocorreu um erro"
  }
}
```

#### 5. **Logging Responsável**

Não logar dados sensíveis:

```typescript
// ❌ Inseguro
console.log({ user: { email, password, token } });

// ✅ Seguro
console.log({ user: { email, role } });
console.debug(`User ${user.id} performed action X`);
```

#### 6. **Variáveis de Ambiente Seguras**

Dados sensíveis não hardcoded:

```env
# .env (não versionado)
VITE_API_URL=https://senacpass-api-amc2eubab9emcxfu.centralus-01.azurewebsites.net
VITE_APP_NAME=SenacPass

# ❌ NUNCA
VITE_API_KEY=sk_live_xxxxxxxxxxxxx  # Exposto no código
```

#### 7. **Conformidade com LGPD**

Lei Geral de Proteção de Dados:

- ✅ Coleta apenas de dados necessários
- definição da finalidade e da base legal do tratamento
- política de retenção e descarte
- atendimento aos direitos dos titulares
- controle de acesso e trilha de auditoria
- processo institucional de resposta a incidentes

> Esses itens são requisitos de implantação e governança; o repositório, isoladamente, não comprova conformidade integral com a LGPD.

---

## Cloud Computing

### Estratégia de Infraestrutura

O SenacPass está publicado na **Microsoft Azure**, utilizando serviços gerenciados para hospedar cada camada da solução.

| Camada | Serviço Azure | Responsabilidade |
|--------|---------------|------------------|
| **Frontend** | Azure Static Web Apps | Hospedagem e entrega da aplicação React |
| **Backend** | Azure App Service | Execução e disponibilização da API REST |
| **Banco de Dados** | Azure Database for PostgreSQL - Flexible Server | Persistência gerenciada dos dados |

### Deployment na Microsoft Azure

#### Arquitetura Azure em Produção

```
┌─────────────────────────────────────────────────────┐
│                Usuário Final (HTTPS)                │
└─────────────────────────┬───────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────┐
│              Azure Static Web Apps                  │
│       Frontend React, TypeScript e assets           │
└─────────────────────────┬───────────────────────────┘
                          │ HTTPS/REST
                          ▼
┌─────────────────────────────────────────────────────┐
│                 Azure App Service                   │
│             API REST e regras de negócio            │
└─────────────────────────┬───────────────────────────┘
                          │ Conexão segura
                          ▼
┌─────────────────────────────────────────────────────┐
│ Azure Database for PostgreSQL - Flexible Server     │
│              Persistência gerenciada                │
└─────────────────────────────────────────────────────┘
```

#### Endpoints de Produção

| Recurso | URL |
|---------|-----|
| **Aplicação Web** | https://black-flower-0aa5e4810.7.azurestaticapps.net/ |
| **API Backend** | https://senacpass-api-amc2eubab9emcxfu.centralus-01.azurewebsites.net/api/ |

O frontend utiliza a URL do App Service na variável `VITE_API_URL`. As credenciais e a string de conexão do PostgreSQL devem permanecer configuradas de forma segura nas configurações do App Service, sem exposição no repositório ou no frontend.

### Variáveis de Ambiente por Ambiente

```env
# Development
VITE_API_URL=http://localhost:3333/api
VITE_ENV=development

# Production
VITE_API_URL=https://senacpass-api-amc2eubab9emcxfu.centralus-01.azurewebsites.net/api
VITE_ENV=production
```

---

## IoT: Internet das Coisas

### Papel do Frontend na Arquitetura IoT

O Frontend **não controla diretamente** os dispositivos IoT (ESP32, RFID, sensores). Em vez disso:

1. **Consulta registros** disponibilizados pelo Backend
2. **Visualiza eventos RFID** já processados
3. **Consulta dados** de dispositivos
4. **Exibe o status** retornado pela API

### Fluxo IoT Completo

```
┌────────────────┐
│   ESP32-C3     │ (Camada IoT - não escopo frontend)
│   + RFID       │
│   + HC-SR04    │
└────────┬───────┘
         │ HTTP POST
         │ Payload: { rfid_uid, id_dispositivo }
         ▼
┌────────────────────┐
│  API Backend       │ (Responsável por processar eventos)
│  (Node)            │
│                    │
│ 1. Valida evento   │
│ 2. Identifica aluno│
│ 3. Registra check  │
│ 4. Persiste no BD  │
└────────┬───────────┘
         │ JSON Response via REST
         │ Dados atualizados
         ▼
┌────────────────────────┐
│  Frontend (React)      │ ← Este Projeto
│  [ESTE ESCOPO]         │
│                        │
│ Recebe dados           │
│ Exibe dados consultados│
│ Atualiza dashboard     │
└────────────────────────┘
```

### Dados Exibidos do IoT

| Dado | Origem | Exibição |
|------|--------|----------|
| Status do dispositivo | Cadastro de dispositivo na API | Indicador visual |
| Últimos eventos RFID | Eventos do ESP32 | Lista de check-ins |
| Eventos do dia | Backend | Gráfico/tabela |

---

## Qualidade de Software

### Padrões de Código

#### TypeScript Strict Mode

Tipagem rigorosa garante segurança em tempo de compilação:

```typescript
// ✅ Seguro - tipos explícitos
interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

const createUser = (user: User): User => {
  return {
    ...user,
    id: generateId(),
  };
};

// ❌ Inseguro - any type
const createUser = (user: any): any => {
  return user;
};
```

#### Clean Code Principles

1. **Nomes Descritivos**
```typescript
// ✅ Bom
const getUserFrequencyReport = () => {};
const isUserAuthenticated = () => {};

// ❌ Ruim
const getUR = () => {};
const check = () => {};
```

2. **Funções Pequenas e Focadas**
```typescript
// ✅ Uma responsabilidade
const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ❌ Múltiplas responsabilidades
const validateUser = (user: any): boolean => {
  // validação de email
  // validação de senha
  // validação de CPF
  // salvar no banco
  // enviar email
};
```

3. **Evitar Duplicação (DRY)**
```typescript
// ✅ Reutilizável
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

// ❌ Duplicado
const Component1 = () => <div>{new Date().toLocaleDateString('pt-BR')}</div>;
const Component2 = () => <div>{new Date().toLocaleDateString('pt-BR')}</div>;
const Component3 = () => <div>{new Date().toLocaleDateString('pt-BR')}</div>;
```

### Linting e Formatação

```bash
# ESLint para qualidade
npm run lint

# Verificar específico
npm run lint -- src/

# Corrigir automaticamente (quando possível)
npm run lint -- --fix
```

**Regras ESLint ativas:**
- `no-unused-vars`: Variáveis não utilizadas
- `no-console`: Console em produção (warning)
- `prefer-const`: Usar const ao invés de let
- `react-hooks/rules-of-hooks`: Regras de hooks
- `react-hooks/exhaustive-deps`: Dependencies em useEffect

---

## Análise e Projeto de Sistemas

### Diagrama de Casos de Uso

> O diagrama abaixo representa a visão futura do produto. Na versão atual, apenas o professor possui autenticação; coordenador e aluno dependem da implementação futura de RBAC no backend.

```
                          ┌──────────────────┐
                          │   SenacPass      │
                          └──────────────────┘
                                  │
                ┌─────────────────┼─────────────────┐
                │                 │                 │
             ┌──▼──┐          ┌────▼────┐      ┌───▼────┐
             │ Prof│          │Coordenador  │  │ Aluno  │
             └──┬──┘          └────┬────┘      └───┬────┘
                │                  │               │
    ┌───────────┼──────────────────┼───────────────┼───────────┐
    │           │                  │               │           │
    │      ┌────▼────────┐    ┌────▼────────┐   ┌─────────┐    │
    │      │Consultar    │    │Criar Turma  │   │Consultar│    │
    │      │Frequência   │    │             │   │Minha    │    │
    │      └─────────────┘    └─────────────┘   │Frequência    │
    │                                           └─────────┘    │
    │      ┌────────────────┐  ┌──────────────┐                │
    │      │Visualizar      │  │Gerar         │                │
    │      │Presença Real   │  │Relatório     │                │
    │      └────────────────┘  └──────────────┘                |
    │                                                          │
    │      ┌────────────────┐                                  │
    │      │Autenticar      │                                  │
    │      │(todos)         │                                  │
    │      └────────────────┘                                  │
    │                                                          │
    │      ┌────────────────┐                                  │
    │      │Fazer Login     │                                  │
    │      │(todos)         │                                  │
    │      └────────────────┘                                  │
    │                                                          │
    └──────────────────────────────────────────────────────────┘
```

### Padrão Model-View-Controller (MVC)

Embora React use MVVM (Model-View-ViewModel), a arquitetura segue princípios MVC:

```
┌─────────────────────────────────────────┐
│         Model (Dados)                   │
│  • Services (api.ts, dashboard.ts)      │
│  • Contexts (AuthContext)               │
│  • Types (interfaces)                   │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│     View-Model (Lógica de Negócio)      │
│  • Hooks customizados                   │
│  • Transformação de dados               │
│  • Formatação para exibição             │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│         View (Apresentação)             │
│  • Componentes React                    │
│  • Styled Components                    │
│  • Formulários e Gráficos               │
└─────────────────────────────────────────┘
```

### Padrão Flux (Unidirectional Data Flow)

```
┌──────────────────┐
│   User Action    │ (Clique, input, etc)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    Component     │ Captura evento
│    Dispatcher    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     Action       │ Dispara ação
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│      Store       │ Atualiza estado
│     (Context)    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Re-render      │ React atualiza DOM
│   Component      │
└──────────────────┘
```

---

## Tech English 4 - Project Summary

### Project Overview

**SenacPass** is an **IoT (Internet of Things) solution** developed as an integrating project for Senac PE Faculty. The current backend contract processes RFID readings sent by the device.

### Problem Statement

Academic institutions face critical challenges in attendance management:

- **Time Consumption:** Teachers spend 10-15 minutes performing manual roll calls
- **Human Error:** Manual registration results in 5-8% error rate
- **Limited Visibility:** Teachers cannot easily track attendance records during class
- **Administrative Burden:** Manual data consolidation from multiple classes
- **Poor Traceability:** Difficulty auditing entry/exit times
- **Scalability Issues:** Manual systems don't scale for large institutions

### Solution Architecture

The solution comprises three main layers:

#### 1. **IoT Layer** (Hardware)
- **ESP32-C3 Mini:** Microcontroller running firmware
- **RFID Sensor (MFRC522):** Reads student ID cards
- **HC-SR04 Proximity Sensor:** Hardware component planned by the IoT layer; it is not part of the current API payload
- **Feedback Components:** RGB LED and Buzzer for status indication

#### 2. **Backend Layer** (API)
- Receives RFID events from ESP32
- Validates and processes attendance data
- Manages database persistence
- Provides REST API endpoints for Frontend

#### 3. **Frontend Layer** (Web Application) - **This Project**
- User interface for attendance management
- Dashboard data loaded through REST requests
- Student/class/room management
- Attendance reports and analytics
- Protected frontend routes for authenticated teachers

### Frontend Responsibilities

The Frontend application handles:

1. **User Authentication:** Teacher login with JWT
2. **Data Access:** Query academic resources exposed by the API
3. **Attendance Visualization:** Attendance loaded from REST endpoints
4. **Dashboard & Analytics:** Frequency reports and statistics
5. **Access Scope:** Teacher profile only in the current version

### Technical Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.2.5 |
| Language | TypeScript | ~6.0.2 |
| Build Tool | Vite | 8.0.10 |
| Routing | React Router | 7.14.2 |
| Styling | Styled Components | 6.4.1 |
| HTTP Client | Axios | 1.17.0 |
| Charts | Recharts | 3.8.1 |
| Icons | Lucide React | 1.14.0 |

### Key Features

#### ✅ Authentication
- Secure JWT-based authentication
- Teacher login through `/api/professores/login`
- RBAC and additional user roles are not implemented yet

#### ✅ Attendance Management
- Attendance data loaded from REST endpoints
- Automatic check-in/check-out recording
- Attendance history and analytics

#### ✅ Dashboard & Reporting
- Interactive dashboards backed by API data
- Frequency reports and statistics
- PDF/CSV export is planned but not implemented

#### ✅ Device Management
- Monitor IoT device status
- View device events and statistics
- Device configuration screens are planned; the current interface primarily displays API data

#### ✅ Responsive Design
- Mobile-friendly interface
- Tablet and desktop optimization
- Progressive Web App (PWA) support

### Deployment

The application is deployed on **Microsoft Azure** using managed services:

- **Frontend:** Azure Static Web Apps
- **Backend API:** Azure App Service
- **Database:** Azure Database for PostgreSQL - Flexible Server

### Quality Metrics

- **TypeScript:** Strict compilation enabled
- **Code Quality:** ESLint configured
- **Performance:** Targets depend on the frontend, API and network environment
- **Security:** JWT authentication; additional LGPD controls require governance and backend evolution
- **Availability:** 99.5% uptime target

### Team & Contribution

Developed by a multidisciplinary team of 6 undergraduate students from Senac PE's Software Engineering program as part of the Integrating Project.

---

## Mapeamento das Unidades Curriculares

### Tabela de Mapeamento

| UC | Conceito Aplicado | Evidência no Projeto |
|-------|------------------|----------------------|
| **Cloud Computing** | Arquitetura escalável para múltiplos ambientes | Frontend deployável em Azure, com variáveis de ambiente configuráveis |
| **Comportamento do Consumidor** | Identificação de dor do cliente e proposta de valor | Redução de tarefas administrativas por aula; dashboard atual direcionado ao professor |
| **Segurança de Sistemas da Informação** | Proteção de dados e LGPD | JWT para autenticação; HTTPS em produção; identificação das limitações atuais de RBAC, rate limiting e armazenamento local do token |
| **Qualidade de Software** | Padrões de código | TypeScript strict mode; ESLint; componentes reutilizáveis e separação entre interface e serviços |
| **IoT: Internet das Coisas** | Integração com dispositivos IoT | Recebimento de dados do ESP32-C3; monitoramento de eventos RFID; painel de controle de dispositivos |
| **Análise e Projeto de Sistemas** | Modelagem e arquitetura | Diagramas de casos de uso; MER; diagramas de classes; padrão MVC; arquitetura em camadas |
| **Tech English 4** | Documentação e comunicação técnica | Seção de project summary em inglês; código comentado em inglês; documentação técnica bilíngue |

---

## Dossiê de Evidências

### Aplicação
<img width="1576" height="757" alt="image" src="https://github.com/user-attachments/assets/e17dfd49-f82d-442c-a84f-e66c98cdfcc0" />
<img width="1272" height="592" alt="image" src="https://github.com/user-attachments/assets/bc3f6791-976c-4b7c-8763-a2cee19243d6" />
<img width="1869" height="921" alt="image" src="https://github.com/user-attachments/assets/505ed6f9-1cd1-43f8-b1ed-02680e69c783" />

### Fotos do Protótipo

<img width="1200" height="1600" alt="image" src="https://github.com/user-attachments/assets/188b44cc-47ec-45ff-a0e7-c231f39641a7" />
<img width="1200" height="1600" alt="image" src="https://github.com/user-attachments/assets/3f4cbbaf-a2f5-4a59-8cf8-101d08b6e263" />
<img width="1200" height="1600" alt="image" src="https://github.com/user-attachments/assets/c91a84f6-c21b-4b5e-a751-9924ddd27cbd" />
<img width="1200" height="1600" alt="image" src="https://github.com/user-attachments/assets/15625921-db46-4b46-82a9-802ca80b197c" />
<img width="1200" height="1600" alt="image" src="https://github.com/user-attachments/assets/a37d29b5-de2d-4e28-91af-e24df2c2c24d" />
<img width="1200" height="1600" alt="image" src="https://github.com/user-attachments/assets/4acde412-f14e-4eff-9c93-7bd21eedb44c" />

---

## Demonstração

| Item | Link | Status |
|---|---|---|
| Aplicação Web (Front-end) | [Acessar Dashboard](https://black-flower-0aa5e4810.7.azurestaticapps.net/dashboard) | Online |
| API Backend | [Acessar API](https://senacpass-api-amc2eubab9emcxfu.centralus-01.azurewebsites.net/api/) | Online |
| Repositório do Front-end | [GitHub - SenacPass Front](https://github.com/renatodelgado/senacpass-frontend) | Disponível |
| Repositório do Back-end + IoT | [GitHub - SenacPass Back](https://github.com/renatodelgado/senacpass-backend) | Este repositório |
| Banco de Dados (PostgreSQL) | `senacpass.postgres.database.azure.com` | Protegido (Cloud) |
| API Backend | [Acessar API](https://senacpass-api-amc2eubab9emcxfu.centralus-01.azurewebsites.net/) | Online |
| Slides da Apresentação | [Slide](https://www.canva.com/design/DAHIFTZtW4o/4IifhHqrdpLG9GemMxf5Gg/edit) | Disponível |

---

## Equipe

### Thayana Anália dos Santos Lira
**Função:** Gestora do Projeto  
**Contribuições:** Coordenação da equipe, levantamento de requisitos, divisão de tarefas (Kanban) e garantia do escopo do MVP.  
**LinkedIn:** *[Link](https://www.linkedin.com/in/thayanalira/)*

### Renato Trancoso Branco Delgado
**Função:** Desenvolvedor FullStack e Firmware IoT  
**Contribuições:** Desenvolvimento do firmware do ESP32, integração do leitor RFID, arquitetura das rotas da API e telas do painel.  
**LinkedIn:** *[Link](https://www.linkedin.com/in/renato-delgado-48372b47/)*

### Vinicius Henrique Silva Nascimento
**Função:** Administrador de Banco de Dados (DBA)  
**Contribuições:** Modelagem de dados relacional, criação e execução das migrations com TypeORM, e garantia da integridade referencial no PostgreSQL.  
**LinkedIn:** *[Link](https://www.linkedin.com/in/vinicius-nascimento-673230244/)*

### João Vitor Malveira da Silva
**Função:** Desenvolvedor Back-End  
**Contribuições:** Implementação das regras de negócio na Service Layer, controle de check-in/check-out e autenticação via JWT.  
**LinkedIn:** *[Link](https://www.linkedin.com/in/joão-vitor-malveira/)*

### Maria Clara de Melo
**Função:** Desenvolvedora Back-End  
**Contribuições:** Criação dos módulos de domínio da API, validação de payloads.  
**LinkedIn:** *[Link](https://www.linkedin.com/in/maria-clara-de-melo-11b145247/)*

### João Victor Rodrigues Basante
**Função:** Desenvolvedor Front-End  
**Contribuições:** Construção da interface do usuário, consumo dos endpoints HTTP da API e exibição dos históricos de presença no dashboard.  
**LinkedIn:** *[Link](https://www.linkedin.com/in/joaobasante/)*

---

## Marcas Formativas Senac

### 1️⃣ Domínio Técnico-Científico

**O que é:** Compreensão profunda de conceitos técnicos e científicos, aplicando-os com excelência.

**Como foi evidenciado:**

- ✅ **Arquitetura Moderna:** Implementação de React 19 com Hooks, Context API e componentes funcionais
- ✅ **TypeScript Strict:** 100% de cobertura de tipos, demonstrando compreensão de sistemas de tipos
- ✅ **Padrões de Design:** Aplicação de Component Pattern, Context Pattern, Service Pattern
- ✅ **Cloud Computing:** Preparação para múltiplos ambientes de cloud (AWS, Azure, Google Cloud)
- ✅ **IoT Integration:** Compreensão de fluxo de dados entre ESP32 e aplicação frontend
- ✅ **HTTP & REST:** Implementação correta de requisições assíncronas com Axios
- ✅ **Responsividade:** Media queries, viewport configuration, mobile-first design

**Documentação:** Seções de Arquitetura, Tecnologias, Análise e Projeto

---

### 2️⃣ Resolução de Problemas com Autonomia Digital

**O que é:** Capacidade de identificar, analisar e resolver desafios utilizando recursos digitais de forma independente.

**Como foi evidenciado:**

- ✅ **Problema Identificado:** Ineficiência na chamada manual (10-15 min por aula)
- ✅ **Solução Proposta:** Automação via RFID + IoT
- ✅ **Implementação Autônoma:** Desenvolvimento completo do frontend sem dependências
- ✅ **Troubleshooting:** Tratamento básico de erros de rede e estados vazios
- ✅ **Testing & Debugging:** Ferramentas de desenvolvimento, console logging responsável
- ✅ **Escalabilidade:** Preparação para crescimento de usuários e dados
- ✅ **Documentação:** README completo para facilitar manutenção futura

**Documentação:** Seções de Problema, Objetivos, Arquitetura, Troubleshooting

---

### 3️⃣ Visão Crítica, Ética e Segurança

**O que é:** Análise crítica de problemas considerando aspectos éticos, legais e de segurança.

**Como foi evidenciado:**

- ✅ **LGPD:** Identificação dos dados pessoais tratados e dos controles ainda necessários
- ✅ **Proteção de Dados:** JWT e HTTPS em produção, com limitações atuais documentadas
- ✅ **Ética no Design:** Interface inclusiva (WCAG AA), sem discriminação
- ✅ **Visão Crítica:** Identificação de limitações (e-g., dependência de WiFi, bateria do dispositivo)
- ✅ **Privacidade:** Dados sensíveis não hardcoded, variáveis de ambiente
- ✅ **Responsabilidade:** Logging responsável, sem exposição de detalhes técnicos a usuários
- ✅ **Auditoria:** Rastreabilidade completa de acessos e modificações

**Documentação:** Seções de Segurança, LGPD, Conformidade Regulatória

---

### 4️⃣ Comunicação e Colaboração

**O que é:** Capacidade de comunicar ideias claramente e colaborar efetivamente em equipes.

**Como foi evidenciado:**

- ✅ **Documentação Completa:** README detalhado e profissional
- ✅ **Código Limpo:** Nomes descritivos, comentários e JSDoc
- ✅ **Git Workflow:** Branches, commits semânticos, pull requests
- ✅ **Apresentação:** Seções estruturadas e bem organizadas
- ✅ **Comunicação Técnica:** Explicação clara de conceitos complexos
- ✅ **Colaboração:** Estrutura modular permite trabalho paralelo
- ✅ **Feedback:** Sistema de testes e linting para manter qualidade
- ✅ **Bilinguismo:** Documentação em português e inglês (Tech English)

**Documentação:** README em português e inglês, comments no código, estrutura clara

---

### 5️⃣ Atitude Empreendedora e Inovadora

**O que é:** Iniciativa, criatividade e disposição para inovar, criar soluções e assumir riscos calculados.

**Como foi evidenciado:**

- ✅ **Inovação:** Uso integrado de IoT + RFID + Sensores para resolver problema real
- ✅ **Iniciativa:** Manifesto PWA e Service Worker com cache básico da aplicação
- ✅ **Criatividade:** Design intuitivo, dashboard visual e feedback das consultas à API
- ✅ **Visão de Negócio:** Proposta de valor clara (economizar 10-15 min/aula)
- ✅ **Escalabilidade:** Preparação para crescimento e novos mercados
- ✅ **Produtos:** Aplicação pronta para produção, não apenas prototipo
- ✅ **Mentoria:** Documentação como forma de facilitar adoção

**Documentação:** Seções de Proposta de Valor, Comportamento do Consumidor, Roadmap

---


## Licença

Este projeto está licenciado sob a **Licença MIT**.

```
MIT License

Copyright (c) 2026 SenacPass Equipe

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## Agradecimentos

Gostaríamos de expressar nossa gratidão a:

### Orientadores
- Prof. Arnott Caiado - Orientação no projeto integrador
- Prof. Alison - Auxílio no deploy em nuvem

### Professores das Unidades Curriculares

| UC | Professor |
|---|---|
| Cloud Computing | ALISON VINÍCIUS GOMES DA SILVA |
| Comportamento do Consumidor | PAULO TAVARES GUIMARÃES |
| Segurança de Sistemas da Informação | PAULO HENRIQUE WANDERLEY GUIMARÃES PIMENTEL |
| Qualidade de Software | PAULO HENRIQUE WANDERLEY GUIMARÃES PIMENTEL |
| IoT: Internet das Coisas | ARNOTT RAMOS CAIADO |
| Análise e Projeto de Sistemas | MARCUS VINÍCIUS ALMEIDA FERNANDES DE FIGUEIREDO |
| Tech English 4 | LEONARDO LUCENA TREVAS |

### Instituição
- **Faculdade Senac PE** - Pela oportunidade e infraestrutura
- **Comunidade Open Source** - Pelas ferramentas utilizadas (React, Vite, TypeScript, etc)

### Tecnologias Externas

Somos gratos aos desenvolvedores de:
- React Team
- Vite Team
- TypeScript Team
- Styled Components
- Axios
- Recharts
- ESLint

---

## Referências

### Documentação Oficial

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)
- [Styled Components](https://styled-components.com/)
- [Axios Documentation](https://axios-http.com/)
- [Recharts](https://recharts.org/)

### Padrões e Melhores Práticas

- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Code by Robert Martin](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [Design Patterns](https://refactoring.guru/design-patterns)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

### Regulamentações

- [Lei Geral de Proteção de Dados (LGPD)](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

### Recursos Adicionais

- [REST API Best Practices](https://restfulapi.net/)
- [Cloud Computing Fundamentals](https://aws.amazon.com/pt/what-is-cloud-computing/)
- [IoT Security](https://www.iot-connected.com/iot-security/)

---

## 📝 Histórico de Alterações

| Versão | Data | Alterações | Autor |
|--------|------|-----------|-------|
| 1.0 | 2026-06-06 | Versão inicial completa | Equipe |

---

## Contato e Suporte

Para dúvidas, sugestões ou suporte:

- **Email:** renato.delgado@edu.pe.senac.br

---

<div align="center">

**Desenvolvido com ❤️ pela Equipe SenacPass**

Faculdade Senac PE | Pernambuco | Brasil | 2026

</div>

---

**Fim do Documento**
