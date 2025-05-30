// filepath: /c:/Users/cg3036626/Desktop/projeto/Interactive-Universe/js/routes/UsuarioRoutes.js
const express = require('express');
const UsuarioController = require('../Controllers/Usuario.Controller');
const Usuario = require('../Models/Usuario');

const jwt = require('jsonwebtoken');
const router = express.Router();

// Authentication route
router.post('/login', async (req, res) => {
    const {nome,senha } = req.body;
    console.log(nome, senha)

    try {
        // Find user by email
        const usuario = await Usuario.findOne({ where: { NOME: nome } });
        console.log("USUARIO", usuario);
        

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Verify password (assuming 'senha' is stored hashed)
        const isPasswordValid = usuario.SENHA === senha; // Replace with a proper hash comparison
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha inválida' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, "segredo", { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao autenticar usuário' });
    }
});

router.get('/', UsuarioController.listar);
router.post('/', UsuarioController.criar);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);


module.exports = router;