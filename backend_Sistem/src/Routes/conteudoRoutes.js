const express = require('express');
const router = express.Router();
const ConteudoController = require('../Controllers/conteudoController');
const authMiddleware = require('../middleware/authMiddleware');

// Atualizar conteúdo (somente com autenticação)
router.put('/', authMiddleware, ConteudoController.atualizarConteudo);

// Obter histórico de alterações
router.get('/historico/:page', authMiddleware, ConteudoController.obterHistorico);

// Restaurar versão anterior
router.post('/restaurar', authMiddleware, ConteudoController.restaurarVersao);

module.exports = router;
