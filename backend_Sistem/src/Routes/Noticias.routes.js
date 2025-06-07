const express = require('express');
const router = express.Router();
const NoticiaController = require('../Controllers/noticiaController');
const authMiddleware = require('../middleware/authMiddleware');

// Listar todas as notícias
router.get('/', NoticiaController.listarNoticias);

// Obter notícia por ID
router.get('/:id', NoticiaController.obterNoticia);

// Criar nova notícia (somente com autenticação)
router.post('/', authMiddleware, NoticiaController.criarNoticia);

// Atualizar notícia existente (somente com autenticação)
router.put('/:id', authMiddleware, NoticiaController.atualizarNoticia);

// Excluir notícia (somente com autenticação)
router.delete('/:id', authMiddleware, NoticiaController.excluirNoticia);

module.exports = router;
