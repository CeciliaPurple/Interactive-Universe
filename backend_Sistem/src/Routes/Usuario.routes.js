const express = require('express');
const UsuarioController = require('../Controllers/Usuario.Controller');
const authMiddleware = require('../middleware/authMiddleware'); 
const NoticiaController = require('../Controllers/noticiaController')

const router = express.Router(); 

// rotas públicas
router.post('/login', UsuarioController.login);
router.post('/', UsuarioController.criar);

// Rotas protegidas
router.get('/perfil', authMiddleware, UsuarioController.perfil);
router.put('/perfil', authMiddleware, UsuarioController.atualizarPerfil);
router.delete('/perfil', authMiddleware, UsuarioController.excluirConta);

// Outras rotas (públicas ou com outra lógica)
router.get('/', UsuarioController.listar);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);

module.exports = router;
