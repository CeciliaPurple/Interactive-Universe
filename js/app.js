const express = require('express');
const HomeRoutes = require('./js/Routes/Home.Routes');
const UsuarioRoutes = require('./js/Routes/Usuario.Routes'); // ajuste o caminho se necessário

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', HomeRoutes);
app.use('/usuario', UsuarioRoutes);

module.exports = app;