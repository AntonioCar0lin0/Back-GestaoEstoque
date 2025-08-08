const Transacao = require('../models/Transacao');
const { Op } = require('sequelize');

module.exports = {

  async list(req, res) {
    try {
      const { startDate, endDate, type } = req.query;
      // CHANGE: base de filtro pelo usuário autenticado
      const where = { userId: req.userId };

      if (startDate && endDate) {
        where.data = { [Op.between]: [startDate, endDate] };
      }
      if (type) {
        where.tipo = type;
      }

      const transacoes = await Transacao.findAll({ where, order: [['data', 'DESC']] });
      return res.json({ success: true, transactions: transacoes });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      // CHANGE: garantir que a transação pertence ao usuário autenticado
      const transacao = await Transacao.findOne({ where: { id, userId: req.userId } });
      if (!transacao) {
        return res.status(404).json({ error: 'Transação não encontrada.' });
      }
      return res.json({ success: true, transaction: transacao });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { tipo, valor, descricao, categoria, data, produtoId } = req.body;
      if (!tipo || !valor || !descricao || !categoria || !data) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
      }

      const nova = await Transacao.create({
        tipo,
        valor,
        descricao,
        categoria,
        data,
        produtoId: produtoId || null,
        userId: req.userId, // CHANGE: associar a transação ao usuário autenticado
      });

      return res.status(201).json({ success: true, transaction: nova });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      // CHANGE: atualizar somente transação do usuário autenticado
      const transacao = await Transacao.findOne({ where: { id, userId: req.userId } });
      if (!transacao) return res.status(404).json({ error: 'Transação não encontrada.' });

      await transacao.update(req.body);
      return res.json({ success: true, transaction: transacao });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      // CHANGE: deletar somente transação do usuário autenticado
      const transacao = await Transacao.findOne({ where: { id, userId: req.userId } });
      if (!transacao) return res.status(404).json({ error: 'Transação não encontrada.' });

      await transacao.destroy();
      return res.json({ success: true, message: 'Transação deletada com sucesso.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
