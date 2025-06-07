
const express = require('express');
const cors = require('cors');
const NoticiaRoutes = require('./Routes/Noticias.routes');
const UsuarioRoutes = require('./Routes/Usuario.routes');
const sequelize = require('./Config/Database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/noticias', NoticiaRoutes);
app.use('/usuarios', UsuarioRoutes);

module.exports = app;