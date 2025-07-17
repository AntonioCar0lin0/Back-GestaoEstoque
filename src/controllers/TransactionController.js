const Transacao = require('../models/Transacao');
const { Op } = require('sequelize');

module.exports = {

  async list(req, res) {
    try {
      const { startDate, endDate, type } = req.query;
      const where = {};

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
        const transacao = await Transacao.findByPk(id);
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
        produtoId: produtoId || null
      });

      return res.status(201).json({ success: true, transaction: nova });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const transacao = await Transacao.findByPk(id);
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
      const transacao = await Transacao.findByPk(id);
      if (!transacao) return res.status(404).json({ error: 'Transação não encontrada.' });

      await transacao.destroy();
      return res.json({ success: true, message: 'Transação deletada com sucesso.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
