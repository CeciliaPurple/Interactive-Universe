const { Comentario } = require('../Models/comentarioModel'); // ou onde está o model
const ConteudoController = {
    // ADM pode deletar qualquer comentário
    async deletarComentarioComoAdm(req, res) {
        try {
            const { id } = req.params;

            if (req.user.TIPO !== 'ADM') {
                return res.status(403).json({ error: 'Apenas administradores podem excluir comentários de outros usuários.' });
            }

            const comentario = await Comentario.findByPk(id);
            if (!comentario) {
                return res.status(404).json({ error: 'Comentário não encontrado.' });
            }

            await comentario.destroy();

            return res.json({ success: true, message: 'Comentário excluído com sucesso.' });
        } catch (error) {
            console.error('Erro ao excluir comentário:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    },

    // Listar todos os comentários (para moderação ou histórico)
    async listarTodosComentarios(req, res) {
        try {
            if (req.user.TIPO !== 'ADM') {
                return res.status(403).json({ error: 'Apenas administradores podem visualizar todos os comentários.' });
            }

            const comentarios = await Comentario.findAll({
                include: ['usuario'], // se você tem associação com Usuario
                order: [['createdAt', 'DESC']]
            });

            res.json(comentarios);
        } catch (error) {
            console.error('Erro ao buscar comentários:', error);
            res.status(500).json({ error: 'Erro ao buscar comentários.' });
        }
    },

    // Excluir todos os comentários de uma notícia
    async deletarTodosComentarios(req, res) {
        try {
            if (req.user.TIPO !== 'ADM') {
                return res.status(403).json({ error: 'Apenas administradores podem excluir todos os comentários.' });
            }

            const { idNoticia } = req.params;

            await Comentario.destroy({
                where: { ID_NOTICIA: idNoticia }
            });

            res.json({ success: true, message: 'Todos os comentários foram apagados.' });
        } catch (error) {
            console.error('Erro ao apagar todos comentários:', error);
            res.status(500).json({ error: 'Erro interno ao excluir comentários.' });
        }
    }
};

module.exports = ConteudoController;
