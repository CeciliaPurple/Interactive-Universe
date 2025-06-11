const express = require('express');
const router = express.Router();
const ComentarioController = require('../Controllers/comentarioController');
const authMiddleware = require('../middleware/authMiddleware');

// Criar comentário (usuário logado)
router.post('/', authMiddleware, ComentarioController.criarComentario);

// Listar comentários de uma notícia (público)
router.get('/:idNoticia', ComentarioController.listarPorNoticia);

// Atualizar comentário (usuário ou ADM)
router.put('/:id', authMiddleware, ComentarioController.atualizarComentario);

// Deletar comentário (usuário ou ADM)
router.delete('/:id', authMiddleware, ComentarioController.deletarComentario);

module.exports = router;
