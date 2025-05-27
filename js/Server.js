const sequelize = require('./Config/database');
const Usuario = require('./Models/Usuario');

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        return sequelize.sync(); // Sincroniza os modelos com o banco
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

    // filepath: /c:/Users/cg3036626/Desktop/projeto/Interactive-Universe/js/Server.js
const express = require('express');
const UsuarioRoutes = require('./routes/UsuarioRoutes');

const app = express();

app.use(express.json()); // Para interpretar JSON no corpo das requisições
app.use('/api', UsuarioRoutes); // Prefixo para as rotas

app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});