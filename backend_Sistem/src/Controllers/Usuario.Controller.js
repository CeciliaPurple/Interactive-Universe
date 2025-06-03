// filepath: /c:/Users/cg3036626/Desktop/projeto/Interactive-Universe/js/controllers/UsuarioController.js
const Usuario = require('../Models/Usuario');
const jwt = require('jsonwebtoken');


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
            res.status(200).json({ message: 'Usuário cadastrado com sucesso.', usuario: novoUsuario });
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
            res.status(200).json({ message: 'Usuário atualizado com sucesso.', usuario: usuarioAtualizado });
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
            res.status(200).json({ message: 'Usuário deletado com sucesso.', usuarioId: id });
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao deletar usuário.' });
        }
    },

    async login(req, res) {
        const {nome,senha } = req.body;
        console.log(nome, senha)
    
        try {
            const usuario = await Usuario.findOne({ where: { NOME: nome } });
            console.log("USUARIO", usuario);
            
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
    
            const isPasswordValid = usuario.SENHA === senha;
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Senha inválida' });
            }
    
            const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, "segredo", { expiresIn: '1h' });
    
            res.json({ token });
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }
    }
};

module.exports = UsuarioController;