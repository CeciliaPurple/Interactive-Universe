// routes/conteudo.js
const express = require('express');
const router = express.Router();
const ConteudoController = require('../controllers/conteudoController');
const authMiddleware = require('../middleware/authMiddleware');

// Obter conteúdo da página (nebulosa, eclipse, etc)
router.get('/:pagina', ConteudoController.getConteudo);

// Atualizar conteúdo da página (somente admin)
router.put('/:pagina', authMiddleware, ConteudoController.atualizarConteudo);

module.exports = router;
