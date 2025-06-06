const express = require('express');
const cors = require('cors');
const UsuarioRoutes = require('./Routes/Usuario.routes');
// const authMiddleware = require('./middleware/authMiddleware'); // não precisa importar aqui se não usar globalmente

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/usuarios', UsuarioRoutes);

module.exports = app;
