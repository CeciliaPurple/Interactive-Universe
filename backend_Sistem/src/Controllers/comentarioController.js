const Comentario = require('../Models/comentarioModel');
const Noticia = require('../Models/noticiaModel');
const Usuario = require('../Models/Usuario'); // para incluir dados do usuário

// Criar um novo comentário (usuário logado)

exports.criarComentario = async (req, res) => {
  try {
    const { texto, noticiaId } = req.body;  // agora em minúsculo

    const noticiaExiste = await Noticia.findOne({ where: { idNOTICIAS: noticiaId } });
    if (!noticiaExiste) {
      return res.status(404).json({ error: 'Notícia não encontrada.' });
    }

    const novoComentario = await Comentario.create({
      TEXTO: texto,   // mapeia para maiúsculo que é o campo no DB
      USUARIO_ID: req.user.ID,
      NOTICIAS_idNOTICIAS: noticiaId
    });

    res.status(201).json({
      id: novoComentario.ID,
      texto: novoComentario.TEXTO,
      dataPost: novoComentario.DATA_POST,
      usuarioId: novoComentario.USUARIO_ID,
      noticiaId: novoComentario.NOTICIAS_idNOTICIAS
    });
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    res.status(500).json({ error: 'Erro ao criar comentário.' });
  }
};

// Listar todos os comentários de uma notícia (público)
exports.listarPorNoticia = async (req, res) => {
  try {
    const { idNoticia } = req.params;

    const comentarios = await Comentario.findAll({
      where: { NOTICIAS_idNOTICIAS: idNoticia },
      order: [['DATA_POST', 'DESC']],
      include: [{
        model: Usuario,
        attributes: ['ID', 'NOME', 'EMAIL']
      }]
    });

    console.log('Comentarios encontrados:', comentarios);  // Debug no terminal

    const comentariosFormatados = comentarios.map(c => ({
      id: c.ID,
      texto: c.TEXTO,
      dataPost: c.DATA_POST,
      usuario: {
        id: c.Usuario?.ID || null,
        nome: c.Usuario?.NOME || 'Usuário desconhecido',
        email: c.Usuario?.EMAIL || null
      }
    }));

    console.log('Comentarios formatados:', comentariosFormatados);  // Debug no terminal

    // Responder ao cliente (Postman ou frontend)
    res.json({
      message: 'Comentários encontrados',
      comentarios: comentariosFormatados
    });
  } catch (error) {
    console.error('Erro ao listar comentários:', error);
    res.status(500).json({ error: 'Erro ao listar comentários.' });
  }
};


// Atualizar um comentário (apenas o autor)
exports.atualizarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto } = req.body; // minúsculo

    if (!texto) {
      return res.status(400).json({ error: 'O campo TEXTO é obrigatório.' });
    }

    const comentario = await Comentario.findByPk(id);
    if (!comentario) {
      return res.status(404).json({ error: 'Comentário não encontrado.' });
    }

    if (comentario.USUARIO_ID !== req.user.ID) {
      return res.status(403).json({ error: 'Você não tem permissão para editar este comentário.' });
    }

    comentario.TEXTO = texto;
    await comentario.save();

    res.json({
      message: 'Comentário atualizado com sucesso.',
      comentario: {
        id: comentario.ID,
        texto: comentario.TEXTO,
        dataPost: comentario.DATA_POST
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar comentário:', error);
    res.status(500).json({ error: 'Erro ao atualizar comentário.' });
  }
}

// Excluir um comentário (apenas o autor)
exports.deletarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const comentario = await Comentario.findByPk(id);

    if (!comentario) {
      return res.status(404).json({ error: 'Comentário não encontrado.' });
    }

    const usuarioLogadoId = req.user.ID;
    const tipoUsuario = req.user.TIPO; // 'ADM' ou 'USUARIO'

    // Permite exclusão se for autor ou ADM
    if (comentario.USUARIO_ID !== usuarioLogadoId && tipoUsuario !== 'ADM') {
      return res.status(403).json({ error: 'Você não tem permissão para excluir este comentário.' });
    }

    await comentario.destroy();
    res.json({ message: 'Comentário excluído com sucesso.' });

  } catch (error) {
    console.error('Erro ao excluir comentário:', error);
    res.status(500).json({ error: 'Erro ao excluir comentário.' });
  }
};

