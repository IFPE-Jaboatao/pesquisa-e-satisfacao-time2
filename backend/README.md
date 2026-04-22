# Sistema de Pesquisa de Satisfação — Backend

## Descrição

Este repositório contém o **backend** do projeto **Sistema de Pesquisa de Satisfação**, desenvolvido com **NestJS**, **TypeORM** e **MySQL**.

A aplicação foi construída em arquitetura modular para permitir organização, escalabilidade e separação de responsabilidades entre as camadas de controller, service e entidade. Essa abordagem está alinhada com a proposta do NestJS de organizar aplicações grandes em módulos bem definidos .

O sistema tem como foco o gerenciamento de pesquisas de satisfação, permitindo cadastrar pesquisas, disponibilizá-las para resposta e registrar as submissões dos usuários, em linha com os requisitos de criação de pesquisas e envio de respostas .

---

## Objetivo

O objetivo deste backend é:

* gerenciar pesquisas de satisfação
* disponibilizar pesquisas ativas
* registrar respostas enviadas
* armazenar dados em banco relacional
* preparar a base para futuras regras de negócio, autenticação e relatórios

---

## Tecnologias Utilizadas

* **Node.js**
* **TypeScript**
* **NestJS**
* **TypeORM**
* **MySQL**
* **class-validator**
* **class-transformer**

---

## Arquitetura

O projeto segue a arquitetura padrão do NestJS:

* **Controller** → recebe as requisições HTTP
* **Service** → contém a lógica de negócio
* **Entity** → representa as tabelas do banco
* **Module** → organiza os componentes de cada funcionalidade

---

## Estrutura Atual do Projeto

```bash
backend/
├── src/
│   ├── modules/
│   │   ├── health/
│   │   │   ├── health.controller.spec.ts
│   │   │   ├── health.controller.ts
│   │   │   ├── health.module.ts
│   │   │   ├── health.service.spec.ts
│   │   │   └── health.service.ts
│   │   │
│   │   ├── response/
│   │   │   ├── dto/
│   │   │   │   ├── create-response-item.dto.ts
│   │   │   │   └── create-response.dto.ts
│   │   │   ├── entities/
│   │   │   │   ├── response-item.entity.ts
│   │   │   │   └── response.entity.ts
│   │   │   ├── response.controller.ts
│   │   │   ├── response.module.ts
│   │   │   └── response.service.ts
│   │   │
│   │   ├── survey/
│   │   │   ├── dto/
│   │   │   │   ├── create-survey.dto.ts
│   │   │   │   └── update-survey.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── survey.entity.ts
│   │   │   ├── survey.controller.ts
│   │   │   ├── survey.module.ts
│   │   │   └── survey.service.ts
│   │
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│
├── test/
├── .env
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

---

## Configuração do Ambiente

### 1. Instalar dependências

Dentro da pasta `backend`, execute:

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do backend com as variáveis do banco:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=pesquisa_satisfacao
```

### 3. Executar o projeto

```bash
npm run start:dev
```

A API estará disponível em:

```bash
http://localhost:3000/api
```

---

## Funcionalidades Implementadas até o Momento

### 1. Módulo Health

Responsável por verificar se a API está online.

**Objetivo:**

* validar se o backend está rodando corretamente
* facilitar testes iniciais da aplicação

**Rota principal:**

* `GET /api/health`

---

### 2. Módulo Survey

Responsável pelo gerenciamento das pesquisas.

**Funcionalidades atuais:**

* criar pesquisa
* listar pesquisas
* buscar pesquisa por ID
* atualizar pesquisa
* remover pesquisa
* listar pesquisas ativas

**Arquivos principais:**

* `survey.module.ts`
* `survey.controller.ts`
* `survey.service.ts`
* `survey.entity.ts`
* DTOs:

  * `create-survey.dto.ts`
  * `update-survey.dto.ts`

---

### 3. Módulo Response

Responsável pelo envio e armazenamento das respostas da pesquisa.

**Funcionalidades atuais:**

* registrar resposta
* listar respostas
* buscar resposta por ID
* listar respostas por pesquisa
* remover resposta

**Arquivos principais:**

* `response.module.ts`
* `response.controller.ts`
* `response.service.ts`
* `response.entity.ts`
* `response-item.entity.ts`
* DTOs:

  * `create-response.dto.ts`
  * `create-response-item.dto.ts`

---

## Modelagem Atual do Banco

A modelagem foi construída para atender ao fluxo principal da pesquisa de satisfação, com pesquisa principal e submissões associadas.

### Tabela `surveys`

Armazena as pesquisas cadastradas.

**Campos principais:**

* `id`
* `title`
* `description`
* `isActive`
* `startDate`
* `endDate`
* `isAnonymous`
* `createdAt`
* `updatedAt`

---

### Tabela `responses`

Armazena a submissão geral da pesquisa.

**Campos principais:**

* `id`
* `surveyId`
* `course`
* `period`
* `shift`
* `semester`
* `campus`
* `finalComment`
* `wouldRecommend`
* `createdAt`

---

### Tabela `response_items`

Armazena cada resposta individual vinculada a uma submissão.

**Campos principais:**

* `id`
* `responseId`
* `questionId`
* `selectedValue`
* `textAnswer`
* `createdAt`

---

## Fluxo Atual da Aplicação

O fluxo implementado até o momento funciona assim:

1. uma pesquisa é criada
2. a pesquisa pode ser consultada
3. pesquisas ativas podem ser listadas
4. o usuário envia uma resposta
5. a resposta e seus itens são registrados no banco de dados

Esse fluxo acompanha a lógica principal da jornada de resposta da pesquisa, na qual o usuário acessa uma pesquisa disponível, responde e confirma o envio .

---

## Testes

Os testes iniciais foram realizados com:

* **Postman**

Também existem arquivos de teste automático gerados pelo NestJS no módulo `health` e nos arquivos padrão da aplicação.

### Endpoints já testados manualmente

#### Health

* `GET /api/health`

#### Survey

* `POST /api/surveys`
* `GET /api/surveys`
* `GET /api/surveys/:id`
* `GET /api/surveys/active`
* `PATCH /api/surveys/:id`
* `DELETE /api/surveys/:id`

#### Response

* `POST /api/responses`
* `GET /api/responses`
* `GET /api/responses/:id`
* `GET /api/responses/survey/:surveyId`
* `DELETE /api/responses/:id`

---

## Organização de Branches

O projeto segue um fluxo com branches para facilitar o trabalho em equipe.

### Branches principais

* `main` → versão estável
* `develop` → integração do time

### Branches de desenvolvimento

Cada funcionalidade é criada em uma branch separada:

---

## Etapas do Projeto

### Etapa 1 — Backend Base

Concluído:

* configuração do projeto NestJS
* configuração do MySQL
* integração com TypeORM
* configuração de variáveis de ambiente
* ajuste do `app.module.ts`
* ajuste do `main.ts`
* criação do módulo `health`

### Etapa 2 — Fluxo Principal da Pesquisa

Em andamento/concluído parcialmente:

* módulo `survey`
* módulo `response`
* entidades
* DTOs
* endpoints principais

### Próximas Etapas

Planejado:

* módulo `question`
* módulo `option`
* regras de negócio mais completas
* autenticação e autorização
* documentação com Swagger
* relatórios
* integração com frontend React + Flowbite

---

## README e Documentação

Este README documenta o estágio atual do backend.

Ainda serão adicionados futuramente:

* Swagger
* autenticação
* collection de testes exportada
* regras de negócio completas

---

## Equipe

Projeto desenvolvido em equipe para disciplina de Desenvolvimento Web.

---

## Licença

Projeto acadêmico, sem fins comerciais.

