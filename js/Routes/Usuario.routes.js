// filepath: /c:/Users/cg3036626/Desktop/projeto/Interactive-Universe/js/routes/UsuarioRoutes.js
const express = require('express');
const UsuarioController = require('../Controllers/Usuario.Controller');

const router = express.Router();

router.get('/', UsuarioController.listar);
router.post('/', UsuarioController.criar);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);

module.exports = router;