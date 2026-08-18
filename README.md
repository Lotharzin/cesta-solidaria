# 🧺 Cesta Solidária

Sistema web de arrecadação de alimentos, desenvolvido em **Node.js + Express**
(back-end) e **HTML/CSS/JS puro** (front-end), seguindo a arquitetura em
camadas **Model → Repository → Service → Controller**.

## ✨ Funcionalidades

- Visualizar informações sobre a campanha (com estatísticas em tempo real)
- Cadastrar doador (com endereço)
- Cadastrar alimentos
- Registrar uma doação, vinculando doador e alimentos
- Exibir listagens de doadores, alimentos e doações cadastrados

## 🏗️ Arquitetura

```
src/
├── models/          # Entidades: Doador, Endereco, Alimento, Doacao
├── repositories/     # Acesso/gerenciamento dos dados (armazenamento em memória)
├── services/         # Regras de negócio e validações
├── controllers/       # Recebem requisições HTTP e controlam o fluxo
├── routes/            # Definição das rotas da API REST
└── app.js             # Configuração do Express

public/                # Front-end (HTML/CSS/JS)
docs/diagrama-uml.md    # Diagrama UML do relacionamento entre objetos
server.js               # Ponto de entrada da aplicação
```

Fluxo de uma requisição:

```
Cliente → Controller → Service → Repository → Dados
```

O **Model** representa as entidades do sistema e é utilizado pelas camadas
Service e Repository — nunca a lógica de negócio fica misturada com o acesso
a dados ou com o tratamento das requisições HTTP.

### 🔗 Relacionamentos entre objetos

- Um **Doador** possui um **Endereço** (1:1)
- Um **Doador** pode realizar uma ou várias **Doações** (1:N)
- Uma **Doação** possui um ou vários **Alimentos** (1:N)

Veja o diagrama completo em [`docs/diagrama-uml.md`](docs/diagrama-uml.md).

## ▶️ Como executar

Pré-requisitos: [Node.js](https://nodejs.org) instalado (versão 18+).

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor
npm start

# 3. Abrir no navegador
http://localhost:3000
```

## 📡 API REST

| Método | Rota                                | Descrição                                  |
|--------|--------------------------------------|---------------------------------------------|
| GET    | `/api/campanha`                     | Informações e estatísticas da campanha       |
| POST   | `/api/doadores`                     | Cadastra um doador                          |
| GET    | `/api/doadores`                     | Lista todos os doadores                     |
| GET    | `/api/doadores/:id`                 | Busca um doador pelo id                     |
| POST   | `/api/alimentos`                    | Cadastra um alimento                        |
| GET    | `/api/alimentos`                    | Lista todos os alimentos                    |
| GET    | `/api/alimentos/disponiveis`        | Lista alimentos ainda não vinculados         |
| POST   | `/api/doacoes`                      | Registra uma doação (doador + alimentos)    |
| GET    | `/api/doacoes`                      | Lista todas as doações (detalhadas)          |
| GET    | `/api/doacoes/:id`                  | Detalha uma doação                          |
| GET    | `/api/doadores/:doadorId/doacoes`   | Lista as doações de um doador                |

> Os dados são armazenados em memória (arrays), reiniciando ao reiniciar o
> servidor. Essa escolha mantém o foco na arquitetura em camadas; trocar por
> um banco de dados exigiria alterar apenas a camada **Repository**.

## 📦 Publicando no GitHub

```bash
git init
git add .
git commit -m "Cesta Solidária - sistema de arrecadação de alimentos"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/cesta-solidaria.git
git push -u origin main
```

Lembre-se de deixar o repositório **público** e de manter a pasta `docs/`
(com o diagrama UML) junto do código, conforme solicitado na entrega.

## 🎨 Identidade visual

A logo (`public/img/logo-cesta-solidaria.svg`) usa uma cesta com um coração,
representando a solidariedade da campanha "Unidos contra a fome".
