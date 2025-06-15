const express = require('express');
const router = express.Router();
const ConteudoController = require('../Controllers/conteudoController');
const authMiddleware = require('../middleware/authMiddleware');

// Excluir comentário individual como ADM
router.delete('/comentario/:id', authMiddleware, ConteudoController.deletarComentarioComoAdm);

// Listar todos os comentários
router.get('/comentarios', authMiddleware, ConteudoController.listarTodosComentarios);

// Apagar todos os comentários de uma notícia
router.delete('/comentarios/todos/:idNoticia', authMiddleware, ConteudoController.deletarTodosComentarios);

module.exports = router;
