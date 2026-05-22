# Avalia-Plus — Sistema de Pesquisa de Satisfação

## Descrição
Este repositório contém o backend do projeto **Avalia-Plus — Sistema de Pesquisa de Satisfação**, desenvolvido utilizando **NestJS**, **TypeORM**, **MySQL** e autenticação com **JWT**.

A aplicação foi construída seguindo arquitetura modular, promovendo organização, separação de responsabilidades e escalabilidade entre as camadas de controller, service, entity e module, conforme as boas práticas do NestJS.

O sistema tem como objetivo gerenciar pesquisas de satisfação institucionais, permitindo:

- cadastro e gerenciamento de pesquisas;
- autenticação administrativa;
- disponibilização de pesquisas públicas;
- gerenciamento de perguntas e opções;
- registro de respostas anônimas;
- bloqueio de respostas duplicadas;
- validação de período ativo da pesquisa;
- futura geração de relatórios e métricas.

O backend foi desenvolvido com base nas jornadas e protótipos definidos no Figma do projeto Avalia-Plus, seguindo os requisitos da disciplina de Desenvolvimento Web para implementação de uma API REST com regras reais de negócio.

---

## Tecnologias Utilizadas
- **Node.js**
- **TypeScript**
- **NestJS**
- **TypeORM**
- **MySQL**
- **JWT Authentication**
- **Swagger**
- **class-validator**
- **bcryptjs**
---

## Arquitetura
O projeto segue a arquitetura padrão do NestJS:

- **Controllers** → gerenciamento das rotas e requisições HTTP
- **Services** → implementação das regras de negócio
- **Entities** → modelagem e persistência dos dados
- **Modules** → encapsulamento das funcionalidades
- **DTOs** → validação e tipagem dos dados recebidos
- **Guards** → proteção de rotas com autenticação JWT
---
 
### BACKEND

## Configuração do Ambiente
### 1. Instalar dependências
Dentro da pasta `backend`, execute:

```bash
npm install
```
```bash
npm install class-validator class-transformer
```
```bash
npm install @nestjs/swagger
```
```bash
npm install @nestjs/jwt passport-jwt
```
```bash
npm install bcryptjs
```
### 2. Configurar variáveis de ambiente
Configure o arquivo .env na raiz do backend:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=pesquisa_satisfacao

JWT_SECRET=jwt_secret
JWT_EXPIRES_IN=1d
```
### 3. Executar o projeto

```bash
npm run start:dev
```

### API Base:
```bash
http://localhost:3000/api
```

### Swagger:
```bash
http://localhost:3000/api/docs
```

### Pesquisa Pública:
```bash
http://localhost:3000/api/surveys/public/1
```
### Protótipo (Figma)

O layout do sistema foi desenvolvido no Figma:
```
🔗 https://www.figma.com/proto/0jw5ZMS1jzTk8XWhGgaEUT/Pesquisa-de-Satisfa%C3%A7%C3%A3o-Time2--Avalia-Plus-?node-id=179-2&t=digXDiVeJ4Yvltp1-1
```
## Importar Collection do Postman

1. Abra o Postman
2. Clique em Import
3. Selecione:

docs/Avalia-Plus-Collection.json

4. Inicie o backend
5. Execute os testes da collection


### FRONTEND

### 1. Instalar dependências
Dentro da pasta `frontend`, execute:

```bash
npm install
```

### 2. Executar o projeto

```bash
npm run dev

```
## Funcionalidades Implementadas até o Momento

### Módulo Survey
Responsável pelo gerenciamento das pesquisas de satisfação e controle de disponibilidade para resposta.

#### Funcionalidades implementadas
- criação de pesquisas
- listagem de pesquisas cadastradas
- busca de pesquisa por ID
- atualização de pesquisas
- remoção de pesquisas
- listagem de pesquisas ativas
- validação de período de início e término
- disponibilização de rota pública para resposta
- controle de status ativo/inativo

#### Arquivos principais
- `survey.module.ts`
- `survey.controller.ts`
- `survey.service.ts`
- `survey.entity.ts`

#### DTOs
- `create-survey.dto.ts`
- `update-survey.dto.ts`
  
---

### Módulo Response
Responsável pelo recebimento, validação e armazenamento das respostas enviadas pelos respondentes.

#### Funcionalidades implementadas
- registro de respostas da pesquisa
- armazenamento de respostas individuais por pergunta
- listagem de respostas cadastradas
- busca de resposta por ID
- listagem de respostas por pesquisa
- remoção de respostas
- bloqueio de respostas duplicadas
- validação de pesquisa ativa
- validação de período disponível para resposta

#### Arquivos principais
- `response.module.ts`
- `response.controller.ts`
- `response.service.ts`
- `response.entity.ts`
- `response-item.entity.ts`

#### DTOs
- `create-response.dto.ts`
- `create-response-item.dto.ts`

---

### Módulo Question
Responsável pelo gerenciamento das perguntas vinculadas às pesquisas.

#### Funcionalidades implementadas
- cadastro de perguntas
- listagem de perguntas
- relacionamento entre perguntas e pesquisas
- suporte a múltiplas opções de resposta

#### Arquivos principais
- `question.module.ts`
- `question.controller.ts`
- `question.service.ts`
- `question.entity.ts`
- 
---

### Módulo Option
Responsável pelo gerenciamento das opções vinculadas às perguntas.

#### Funcionalidades implementadas
- cadastro de opções de resposta
- associação entre opções e perguntas
- suporte a escalas de satisfação
- suporte a métricas futuras com score

#### Arquivos principais
- `option.module.ts`
- `option.controller.ts`
- `option.service.ts`
- `option.entity.ts`
  
---

### Módulo Auth
Responsável pela autenticação e proteção das rotas administrativas.

#### Funcionalidades implementadas
- login com JWT
- geração de token de autenticação
- cadastro de administrador
- criptografia de senha com bcrypt
- proteção de rotas com JwtAuthGuard

#### Arquivos principais
- `auth.module.ts`
- `auth.controller.ts`
- `auth.service.ts`
- `jwt.strategy.ts`
- `jwt-auth.guard.ts`
- `user.entity.ts`
  
---

## Modelagem Atual do Banco de Dados
A modelagem foi estruturada para atender ao fluxo completo de pesquisas de satisfação, incluindo gerenciamento administrativo, perguntas, opções e submissões de respostas.

---

### Tabela `surveys`
Armazena as pesquisas cadastradas no sistema.

#### Campos principais
- `id`
- `title`
- `description`
- `isActive`
- `startDate`
- `endDate`
- `isAnonymous`
- `createdAt`
- `updatedAt`

#### Responsabilidades
- controlar disponibilidade da pesquisa
- definir período de resposta
- centralizar perguntas vinculadas
---

### Tabela `questions`
Armazena as perguntas pertencentes às pesquisas.

#### Campos principais
- `id`
- `title`
- `description`
- `surveyId`

#### Responsabilidades
- representar perguntas da pesquisa
- permitir relacionamento com múltiplas opções
---

### Tabela `options`
Armazena as opções de resposta vinculadas às perguntas.

#### Campos principais
- `id`
- `label`
- `value`
- `score`
- `questionId`

#### Responsabilidades
- representar alternativas de satisfação
- permitir cálculo de métricas futuras
- estruturar escalas de avaliação
---

### Tabela `responses`
Armazena a submissão geral enviada pelo respondente.

#### Campos principais
- `id`
- `surveyId`
- `course`
- `period`
- `shift`
- `semester`
- `campus`
- `finalComment`
- `wouldRecommend`
- `respondentToken`
- `createdAt`

#### Responsabilidades
- registrar envio da pesquisa
- impedir respostas duplicadas
- armazenar dados gerais do respondente
---

### Tabela `response_items`
Armazena cada resposta individual vinculada a uma submissão.

#### Campos principais
- `id`
- `responseId`
- `questionId`
- `selectedValue`
- `textAnswer`
- `createdAt`

#### Responsabilidades
- registrar respostas por pergunta
- armazenar respostas objetivas e discursivas
- permitir análise individual das questões
---
---
## Fluxo Atual da Aplicação

O fluxo implementado atualmente segue a arquitetura definida para o sistema Avalia-Plus, contemplando o gerenciamento administrativo das pesquisas e o processo público de resposta.

---
### Fluxo administrativo
1. o administrador realiza autenticação utilizando JWT
2. o administrador cria uma pesquisa
3. perguntas são vinculadas à pesquisa
4. opções de resposta são vinculadas às perguntas
5. a pesquisa é disponibilizada publicamente através de uma rota específica
6. pesquisas ativas podem ser consultadas no sistema
---

### Fluxo público de resposta
1. o respondente acessa o link público da pesquisa
2. o sistema valida se a pesquisa está ativa
3. o sistema verifica o período disponível para resposta
4. as perguntas e opções da pesquisa são carregadas
5. o respondente preenche a pesquisa
6. as respostas são enviadas para a API
7. o backend valida respostas duplicadas
8. a submissão é registrada nas tabelas `responses` e `response_items`
9. o sistema retorna confirmação de envio da pesquisa
---

### Regras aplicadas durante o fluxo
- pesquisas inativas não podem ser respondidas
- pesquisas fora do período configurado são bloqueadas
- respostas duplicadas são impedidas
- rotas administrativas exigem autenticação JWT
- rotas públicas podem ser acessadas sem autenticação

---
Esse fluxo foi desenvolvido com base na jornada de resposta definida no protótipo do Figma, contemplando tanto a experiência pública do respondente quanto o gerenciamento administrativo da plataforma.

---

## Autenticação e Segurança
A aplicação utiliza autenticação baseada em **JWT (JSON Web Token)** para proteção das rotas administrativas da API.

O controle de acesso foi implementado utilizando `JwtAuthGuard`, garantindo que apenas usuários autenticados possam acessar funcionalidades administrativas do sistema.

### Funcionalidades implementadas:
- autenticação com JWT
- login administrativo
- geração de token de acesso
- criptografia de senha com bcrypt
- proteção de rotas com `JwtAuthGuard`
- controle de acesso administrativo
- integração da autenticação com Swagger

---
### Perfil disponível

- "ADMINISTRADOR"

### Exemplo de login

```http
POST /api/auth/login
{
  "email": "admin@email.com",
  "password": "123456"
}

Retorno
{
  "access_token": "TOKEN_JWT"
}
```

### Uso do Token

Para acessar rotas protegidas:

Acesse o Swagger
Clique em Authorize
Insira:

Bearer SEU_TOKEN

---

**Testes**

Os testes da API foram realizados manualmente utilizando **Swagger** e **Postman**, validando autenticação, rotas protegidas, rotas públicas e regras de negócio.

**Endpoints testados manualmente**

#### Auth
- `POST /api/auth/login`
- `POST /api/auth/users`
- `GET /api/auth/users`

#### Survey
- `POST /api/surveys`
- `GET /api/surveys`
- `GET /api/surveys/:id`
- `GET /api/surveys/active`
- `GET /api/surveys/public/:id`
- `PATCH /api/surveys/:id`
- `DELETE /api/surveys/:id`

#### Question
- `POST /api/questions`
- `GET /api/questions`

#### Option
- `POST /api/option`

#### Response
- `POST /api/responses`
- `GET /api/responses`
- `GET /api/responses/:id`
- `GET /api/responses/survey/:surveyId`
- `DELETE /api/responses/:id`

### Regras validadas nos testes
- login com geração de token JWT
- acesso a rotas protegidas usando Bearer Token
- criação de pesquisa por administrador autenticado
- acesso público à pesquisa por link
- bloqueio de pesquisa inativa
- bloqueio de pesquisa fora do período configurado
- registro de resposta anônima
- bloqueio de resposta duplicada por `respondentToken`
- listagem de respostas por pesquisa

---
## Etapas do Projeto

### Etapa 1 — Backend Base
Concluído:
* configuração do projeto NestJS
* configuração do MySQL
* integração com TypeORM
* configuração de variáveis de ambiente
* criação do módulo `health`

### Etapa 2 — Fluxo Principal da Pesquisa
Concluído:
* módulo `survey`
* módulo `response`
* módulo `question`
* módulo `option`
* entidades
* DTOs
* endpoints principais

### Etapa 3 — Segurança e Documentação
Concluído:
* autenticação com JWT
* controle por perfil (RBAC)
* Swagger configurado
* proteção de rotas

### Próximas Etapas
Planejado:
* regras de negócio mais completas
* relatórios
* collection de testes exportada
* integração com frontend React + Flowbite
* deploy da aplicação
  
---

## Equipe
Projeto desenvolvido em equipe para disciplina de Desenvolvimento Web.

---

## Licença
Projeto acadêmico, sem fins comerciais.
```
