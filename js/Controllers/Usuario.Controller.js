// filepath: /c:/Users/cg3036626/Desktop/projeto/Interactive-Universe/js/controllers/UsuarioController.js
const Usuario = require('../Models/Usuario');

const UsuarioController = {
    // Listar todos os usuários
    async listar(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao listar usuários.' });
        }
    },

    // Criar um novo usuário
    async criar(req, res) {
        try {
            const { NOME, EMAIL, SENHA, TIPO_USUARIO } = req.body;
            const novoUsuario = await Usuario.create({ NOME, EMAIL, SENHA, TIPO_USUARIO });
            res.status(201).json(novoUsuario);
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao criar usuário.' });
        }
    },

    // Atualizar um usuário
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { NOME, EMAIL, SENHA, TIPO_USUARIO } = req.body;
    
            await Usuario.update(
                { NOME, EMAIL, SENHA, TIPO_USUARIO },
                { where: { ID: id } }
            );
    
            const usuarioAtualizado = await Usuario.findByPk(id); // Busca o usuário atualizado
            res.status(200).json(usuarioAtualizado);
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao atualizar usuário.' });
        }
    },

    // Deletar um usuário
    async deletar(req, res) {
        try {
            const { id } = req.params;
            await Usuario.destroy({ where: { ID: id } });
            res.status(200).json({ message: 'Usuário deletado com sucesso.' });
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao deletar usuário.' });
        }
    },
};

module.exports = UsuarioController;