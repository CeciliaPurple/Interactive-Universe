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

        try {
            const { nome, senha } = req.body;
            console.log(nome, senha)

            //buscar usuario pelo nome
            const usuario = await Usuario.findOne({ where: { NOME: nome } });
            console.log("USUARIO", usuario);

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            // Verifica se a senha está correta
            const isPasswordValid = usuario.SENHA === senha;
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Senha inválida' });
            }

            // Gera o token JWT
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

            // Retorna o token JWT
            res.status(200).json({
                message: 'Login realizado com sucesso.',
                token: token
            });

        } catch (error) {
            console.error('Erro no login', error)
            res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }
    },

    // Método para obter o perfil do usuário logado
    perfil: async (req, res) => {
        try {
            const id = req.user.id;

            //buscar pelo nome
            const usuario = await Usuario.findByPk(id);
            console.log()

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            //remover a senha do usuário antes de retornar
            const { SENHA, ...dadosUsuario } = usuario.dataValues;


            res.status(200).json(dadosUsuario);
        } catch (error) {
            console.error('Erro ao obter perfil do usuário', error);
            res.status(500).json({ error: 'Erro ao obter perfil do usuário' });
        }
    },

    // metodo para atualizar perfil do usuario logado
    atualizarPerfil: async (req, res) => {
        try {
            const userId = req.user.userId;
            const { NOME, EMAIL, SENHA } = req.body;

            const usuario = await Usuario.findByPk(userId);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            //atualiza apenas os campos fornecidos
            if (NOME) usuario.NOME = NOME;
            if (EMAIL) usuario.EMAIL = EMAIL;
            if (SENHA) usuario.SENHA = SENHA;
            await usuario.save();

            //remove os campos sensíveis antes de retornar
            const { SENHA: _, ...dadosAtualizados } = usuario.dataValues;

            res.status(200).json({
                message: 'Perfil atualizado com sucesso.',
                usuario: dadosAtualizados
            });
        } catch (error) {
            console.error('Erro ao atualizar perfil do usuario', error)
        }
    },

    //metodo para excluir o perfildo usuario logado
    excluirConta: async (req, res) => {
        try {
            const id = req.user.id;

            await COMENTARIO.destroy({ where: { USUARIO_ID: id } });


            const usuario = await Usuario.findByPk(userId);

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            


            await usuario.destroy();

            res.status(200).json({ message: 'Conta excluida com sucesso.' });
        } catch (error) {
            console.error('Erro ao excluir conta do usuario', error)
        }
    }

}



module.exports = UsuarioController;