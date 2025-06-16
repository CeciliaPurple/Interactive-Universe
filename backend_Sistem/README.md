# Interactive Universe - Site Informativo

**API desenvolvida em Node.JS com JavaScript**

**Projeto Desenvolvido Em Sala De Aula**

## 📚 Informações Acadêmicas

- **Curso**: Técnico de Informática para Internet
- **Instituição**: IFSP - Instituto Federal de São Paulo
- **Campus**: Caraguatatuba
- **Equipe**: Deivid Santana, Maria Cecília, Daniel Santana, Micael Barros

## 🛠 Tecnologias Utilizadas

### Core
- **Node.JS** (Runtime JavaScript)
- **Express** 5.1.0 (Framework web)
- **MySQL2** 3.14.1 (Banco de dados)
- **Sequelize** 6.37.7 (ORM para banco de dados)

### Autenticação & Segurança
- **JsonWebToken** 9.0.2 (Autenticação JWT)
- **CORS** 2.8.5 (Cross-Origin Resource Sharing)

### Ambiente & Desenvolvimento
- **DotEnv** 16.5.0 (Variáveis de ambiente)
- **Nodemon** 3.1.10 (Auto-reload em desenvolvimento)
- **ESLint** 9.27.0 (Linter de código)
- **Sequelize CLI** 6.6.3 (Migrações e seeds)

Desenvolvido em JavaScript utilizando **Visual Studio Code**

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js instalado
- MySQL instalado e rodando
- Git

### Passos para executar

1. **Clone o repositório**:
```bash
git clone https://github.com/CeciliaPurple/Interactive-Universe.git
cd Interactive-Universe
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure as variáveis de ambiente**:
Crie um arquivo `.env` na raiz do projeto:
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=interactive_universe
JWT_SECRET=seu_jwt_secret_aqui
PORT=3000
```

4. **Execute as migrações do banco** (se aplicável):
```bash
npx sequelize-cli db:migrate
```

5. **Inicie o servidor**:

**Desenvolvimento**:
```bash
npm run dev
```

**Produção**:
```bash
npm start
```

O servidor estará rodando em `http://localhost:4000`

## 📋 Funcionalidades

- ✅ API RESTful completa
- ✅ Sistema de autenticação com JWT
- ✅ Integração com banco de dados MySQL
- ✅ ORM Sequelize para gerenciamento de dados
- ✅ Validação de dados
- ✅ CORS configurado para frontend
- ✅ Estrutura modular e escalável

## 🗂 Estrutura do Projeto

```
Interactive-Universe/
├── src/
│   ├── controllers/     # Lógica de controle das rotas
│   ├── models/          # Modelos Sequelize
│   ├── routes/          # Definição das rotas da API
│   ├── middlewares/     # Middlewares customizados
│   ├── config/          # Configurações (DB, JWT, etc.)
│   └── Server.js        # Arquivo principal do servidor
├── .env                 # Variáveis de ambiente (não versionado)
├── package.json         # Dependências e scripts
└── README.md           # Este arquivo
```


## 🔧 Scripts Disponíveis

```bash
npm start        # Inicia o servidor em produção
npm run dev      # Inicia em modo desenvolvimento com nodemon
npm test         # Executa os testes (ainda não implementados)
```

## 🛡 Segurança

- Autenticação via JWT (JSON Web Tokens)
- CORS configurado adequadamente
- Validação de dados de entrada
- Variáveis de ambiente para informações sensíveis

## 👥 Equipe de Desenvolvimento

**Deivid Santana • Maria Cecília • Daniel Santana • Micael Barros**

---

**IFSP Campus Caraguatatuba - 2025**