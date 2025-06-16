
const express = require('express');
const cors = require('cors');
const NoticiaRoutes = require('./Routes/Noticias.routes');
const UsuarioRoutes = require('./Routes/Usuario.routes');
const sequelize = require('./Config/Database');
const conteudoController = require('./Routes/conteudoRoutes');
const comentarioRoutes = require('./Routes/comentarioRoutes');
const conteudoRoutes = require('./Routes/conteudoRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/noticias', NoticiaRoutes);
app.use('/usuarios', UsuarioRoutes);


app.use('/conteudo', conteudoRoutes);


app.use('/comentario', comentarioRoutes);

module.exports = app;