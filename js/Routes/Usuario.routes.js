// filepath: /c:/Users/cg3036626/Desktop/projeto/Interactive-Universe/js/routes/UsuarioRoutes.js
const express = require('express');
const UsuarioController = require('../Controllers/UsuarioController');

const router = express.Router();

router.get('/usuarios', UsuarioController.listar);
router.post('/usuarios', UsuarioController.criar);
router.put('/usuarios/:id', UsuarioController.atualizar);
router.delete('/usuarios/:id', UsuarioController.deletar);

module.exports = router;