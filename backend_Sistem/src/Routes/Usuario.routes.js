// filepath: /c:/Users/cg3036626/Desktop/projeto/Interactive-Universe/js/routes/UsuarioRoutes.js
const express = require('express');
const UsuarioController = require('../Controllers/Usuario.Controller');
const authMiddleware = require('../middleware/authMIddleware');

const router = express.Router();

// rotas públicas
router.post('/login',UsuarioController.login);
router.post('/', UsuarioController.criar);

//Rotas protegidas
router.get('/perfil',authMiddleware, UsuarioController.perfil);
router.put('/perfil',authMiddleware,UsuarioController.atualizarPerfil);
router.delete('/perfil', authMiddleware, UsuarioController.excluirConta);

// Authentication route
router.get('/', UsuarioController.listar);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);


module.exports = router;