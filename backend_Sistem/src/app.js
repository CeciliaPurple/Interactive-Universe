const express = require('express');
const cors = require('cors')
const UsuarioRoutes = require('./Routes/Usuario.routes')
const jwt = require('./middleware/authMIddleware');


const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use((jwt));


app.use('/usuarios', UsuarioRoutes);

module.exports = app;