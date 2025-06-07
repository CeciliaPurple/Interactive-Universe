const { MIDIA, NOTICIAS } = require('../Models/MidiaModel');

const MidiasController = {
  // Listar todas as mídias
  async index(req, res) {
    try {
      const midias = await MIDIA.findAll({ include: NOTICIAS });
      res.json(midias);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar mídias.' });
    }
  },

  // Buscar uma mídia por ID
  async show(req, res) {
    try {
      const midia = await MIDIA.findByPk(req.params.id, { include: NOTICIAS });
      if (!midia) return res.status(404).json({ erro: 'Mídia não encontrada.' });
      res.json(midia);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar a mídia.' });
    }
  },

  // Criar nova mídia
  async store(req, res) {
    try {
      const { url, tipo, NOTICIAS_IDNOTICIAS } = req.body;
      const novaMidia = await MIDIA.create({ url, tipo, NOTICIAS_IDNOTICIAS });
      res.status(201).json(novaMidia);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar mídia.' });
    }
  },

  // Atualizar mídia
  async update(req, res) {
    try {
      const { url, tipo, NOTICIAS_IDNOTICIAS } = req.body;
      const midia = await MIDIA.findByPk(req.params.id);
      if (!midia) return res.status(404).json({ erro: 'Mídia não encontrada.' });

      await midia.update({ url, tipo, NOTICIAS_IDNOTICIAS });
      res.json(midia);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar mídia.' });
    }
  },

  // Deletar mídia
  async destroy(req, res) {
    try {
      const midia = await MIDIA.findByPk(req.params.id);
      if (!midia) return res.status(404).json({ erro: 'Mídia não encontrada.' });

      await midia.destroy();
      res.json({ mensagem: 'Mídia excluída com sucesso.' });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao excluir mídia.' });
    }
  },
};

module.exports = MidiasController;
