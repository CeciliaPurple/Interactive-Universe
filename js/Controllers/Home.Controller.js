const express = require('express');
const router = express.Router();

// Exemplo: importando um modelo do banco de dados (Mongoose)
const User = require('../Models/Usuario.js'); // ajuste o caminho conforme seu projeto

// Rota principal do Home
router.get('/home', async (req, res) => {
    try {
        // Exemplo de consulta ao banco: buscar todos os usuários
        const users = await User.find();
        res.status(200).json({ message: 'Bem-vindo à Home!', users });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao acessar o banco de dados.' });
    }
});

module.exports = router;