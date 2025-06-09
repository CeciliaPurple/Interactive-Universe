
const express = require('express');
const cors = require('cors');
const NoticiaRoutes = require('./Routes/Noticias.routes');
const UsuarioRoutes = require('./Routes/Usuario.routes');
const sequelize = require('./Config/Database');
const conteudoController = require('./Routes/conteudoRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/noticias', NoticiaRoutes);
app.use('/usuarios', UsuarioRoutes);

//
const conteudoRoutes = require('./Routes/conteudoRoutes');

// E esta linha para registrar as rotas
app.use('/conteudo', conteudoRoutes);

module.exports = app;