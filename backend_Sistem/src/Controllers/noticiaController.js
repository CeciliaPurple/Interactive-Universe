const Noticia = require('../Models/noticiaModel');

// Listar todas as notícias
exports.listarNoticias = async (req, res) => {
  try {
    const noticias = await Noticia.findAll({
      attributes: [
        'idNOTICIAS',
        'TITULO',
        'SUB_TITULO',
        'DESCRICAO1',
        'FOTO_CAPA',
        'CONTEUDO',
        'ID_ADM',
        'DATA_PUBLICACAO',
      ],
      order: [['DATA_PUBLICACAO', 'DESC']],
    });
    res.json(noticias);
  } catch (error) {
    console.error('Erro ao listar notícias:', error);
    res.status(500).json({ error: 'Erro ao listar notícias' });
  }
};

// Obter notícia por ID
exports.obterNoticia = async (req, res) => {
  const { id } = req.params;
  try {
    const noticia = await Noticia.findByPk(id);
    if (!noticia) {
      return res.status(404).json({ error: 'Notícia não encontrada' });
    }
    res.json(noticia);
  } catch (error) {
    console.error('Erro ao obter notícia:', error);
    res.status(500).json({ error: 'Erro ao obter notícia' });
  }
};

// Criar nova notícia (somente ADM)
exports.criarNoticia = async (req, res) => {
  const { TITULO, SUB_TITULO, DESCRICAO1, FOTO_CAPA, CONTEUDO, DATA_PUBLICACAO } = req.body;

  if (req.user.TIPO !== 'ADM') {
    return res.status(403).json({ error: 'Apenas administradores podem criar notícias.' });
  }

  try {
    const novaNoticia = await Noticia.create({
      TITULO,
      SUB_TITULO,
      DESCRICAO1,
      FOTO_CAPA,
      CONTEUDO,
      ID_ADM: req.user.ID, // ID do ADM logado
      DATA_PUBLICACAO,
    });
    res.status(201).json(novaNoticia);
  } catch (error) {
    console.error('Erro ao criar notícia:', error);
    res.status(500).json({ error: 'Erro ao criar notícia' });
  }
};

// Atualizar uma notícia completa (somente ADM)
exports.atualizarNoticia = async (req, res) => {
  const { id } = req.params;
  const { TITULO, SUB_TITULO, DESCRICAO1, FOTO_CAPA, CONTEUDO, DATA_PUBLICACAO } = req.body;

  if (req.user.TIPO !== 'ADM') {
    return res.status(403).json({ error: 'Apenas administradores podem atualizar notícias.' });
  }

  try {
    const noticia = await Noticia.findByPk(id);
    if (!noticia) {
      return res.status(404).json({ error: 'Notícia não encontrada' });
    }

    await noticia.update({
      TITULO,
      SUB_TITULO,
      DESCRICAO1,
      FOTO_CAPA,
      CONTEUDO,
      ID_ADM: req.user.ID,
      DATA_PUBLICACAO,
    });

    res.json({ message: 'Notícia atualizada com sucesso', noticia });
  } catch (error) {
    console.error('Erro ao atualizar notícia:', error);
    res.status(500).json({ error: 'Erro ao atualizar notícia' });
  }
};

// Atualizar conteúdos parciais de notícia (somente ADM)
// Essa rota será usada para salvar as alterações do editor in-place
exports.atualizarConteudoParcial = async (req, res) => {
  const noticiaId = req.params.id;
  const atualizacoes = req.body; // Espera receber um objeto com os campos a atualizar

  if (req.user.TIPO !== 'ADM') {
    return res.status(403).json({ error: 'Apenas administradores podem atualizar notícias.' });
  }

  try {
    const noticia = await Noticia.findByPk(noticiaId);

    if (!noticia) {
      return res.status(404).json({ error: 'Notícia não encontrada.' });
    }

    await noticia.update(atualizacoes);

    return res.json({ message: 'Notícia atualizada com sucesso.', noticia });
  } catch (error) {
    console.error('Erro ao atualizar notícia:', error);
    return res.status(500).json({ error: 'Erro ao atualizar notícia.' });
  }
};

// Excluir uma notícia (somente ADM)
exports.excluirNoticia = async (req, res) => {
  const { id } = req.params;

  if (req.user.TIPO !== 'ADM') {
    return res.status(403).json({ error: 'Apenas administradores podem excluir notícias.' });
  }

  try {
    const noticia = await Noticia.findByPk(id);
    if (!noticia) {
      return res.status(404).json({ error: 'Notícia não encontrada' });
    }

    await noticia.destroy();
    res.json({ message: 'Notícia excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir notícia:', error);
    res.status(500).json({ error: 'Erro ao excluir notícia' });
  }
};
