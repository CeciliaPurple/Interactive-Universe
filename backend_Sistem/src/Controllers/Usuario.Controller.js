// filepath: /c:/Users/cg3036626/Desktop/projeto/Interactive-Universe/js/controllers/UsuarioController.js
const Usuario = require('../Models/Usuario');
const jwt = require('jsonwebtoken');
const config = require('../Config/Database');

const UsuarioController = {
    // Listar todos os usuários
    async listar(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error(error);
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
            console.error(error);
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

            const usuarioAtualizado = await Usuario.findByPk(id);
            res.status(200).json({ message: 'Usuário atualizado com sucesso.', usuario: usuarioAtualizado });
        } catch (error) {
            console.error(error);
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
            console.error(error);
            res.status(500).json({ error: 'Erro ao deletar usuário.' });
        }
    },

    // Login
    async login(req, res) {
        try {
            const { nome, senha } = req.body;
            console.log(nome, senha);

            const usuario = await Usuario.findOne({ where: { NOME: nome } });
            console.log("USUARIO", usuario);

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            const isPasswordValid = usuario.SENHA === senha;
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Senha inválida' });
            }

            const token = jwt.sign(
                {
                    id: usuario.ID,
                    nome: usuario.NOME,
                    tipo_usuario: usuario.TIPO_USUARIO,
                    email: usuario.EMAIL
                },
                "meusegredo",
                {
                    expiresIn: "1h"
                }
            );

            res.status(200).json({
                message: 'Login realizado com sucesso.',
                token: token
            });
        } catch (error) {
            console.error('Erro no login', error);
            res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }
    },

    // Obter perfil do usuário logado
    perfil: async (req, res) => {
        try {
            const id = req.user.id;

            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            const { SENHA, ...dadosUsuario } = usuario.dataValues;

            res.status(200).json(dadosUsuario);
        } catch (error) {
            console.error('Erro ao obter perfil do usuário', error);
            res.status(500).json({ error: 'Erro ao obter perfil do usuário' });
        }
    },

    // Atualizar perfil do usuário logado
    atualizarPerfil: async (req, res) => {
        try {
            const userId = req.user.id;
            const { NOME, EMAIL, SENHA } = req.body;

            const usuario = await Usuario.findByPk(userId);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            if (NOME) usuario.NOME = NOME;
            if (EMAIL) usuario.EMAIL = EMAIL;
            if (SENHA) usuario.SENHA = SENHA;
            await usuario.save();

            const { SENHA: _, ...dadosAtualizados } = usuario.dataValues;

            res.status(200).json({
                message: 'Perfil atualizado com sucesso.',
                usuario: dadosAtualizados
            });
        } catch (error) {
            console.error('Erro ao atualizar perfil do usuario', error);
            res.status(500).json({ error: 'Erro ao atualizar perfil do usuário' });
        }
    },

    // Excluir conta do usuário logado
    excluirConta: async (req, res) => {
        try {
            const userId = req.user.id;

            const usuario = await Usuario.findByPk(userId);

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            await usuario.destroy();

            res.status(200).json({ message: 'Conta excluída com sucesso.' });
        } catch (error) {
            console.error('Erro ao excluir conta do usuário', error);
            res.status(500).json({ error: 'Erro ao excluir conta.' });
        }
    }
}

//Listar todos os usuários apenas para admins
exports.listar = async (req,res) => {
    try{
        const usuarios = await Usuarip.findAll({
            attributes: ['ID', 'NOME', 'EMAIL', 'TIPO_USUARIO']
        });

        return res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        return res.status(500).json({ error: 'Erro ao listar usuários.' });
    }
}

//atualizar usuario por id 
exports.atualizar = async (req, res) => {
    try {
        const {id} = req.params;
        const { NOME, EMAIL, SENHA, TIPO_USUARIO } = req.body;

        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        //atualizar os campos
        await usuaerio.update({
            NOME: NOME || usuario.NOME,
            EMAIL: EMAIL || usuario.EMAIL,
            SENHA: SENHA || usuario.SENHA,
            TIPO_USUARIO: TIPO_USUARIO || usuario.TIPO_USUARIO
        })

        return res.status(200).json({
            message: 'Usuário atualizado com sucesso.',
            usuario: {
                ID: usuario.ID,
                NOME: usuario.NOME,
                EMAIL: usuario.EMAIL,
                TIPO_USUARIO: usuario.TIPO_USUARIO
            }
        });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
}

    //deletar usuario por id
    exports.deletar = async (req,res) => {
        try{
            const {id} = req.params;

            const usuario = await Usuario.findAllByPk(id);

            if(usuario){
                return res.status(404).json({
                    message: 'Usuário não encontrado.'
                })
            }

            await Usuario.destroy();

            return res.status(200).json({mensage:'Usuário deletado com sucesso.'});
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            return res.status(500).json({ error: 'Erro ao deletar usuário.' });
        }
    }

module.exports = UsuarioController;