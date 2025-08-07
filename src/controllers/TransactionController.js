const Transacao = require('../models/Transacao');
const Categoria = require('../models/Categoria');
const Produto = require('../models/Produto');
const Usuario = require('../models/Usuario');
const { Op } = require('sequelize');

module.exports = {

  async list(req, res) {
    try {
      const { startDate, endDate, type } = req.query;
      const userId = req.userId;
      const where = { id_usuario: userId };

      if (startDate && endDate) {
        where.data = { [Op.between]: [startDate, endDate] };
      }
      if (type) {
        where.tipo = type;
      }

      const transacoes = await Transacao.findAll({
        where,
        order: [['data', 'DESC']],
        include: [
          { model: Usuario, attributes: ['nome', 'email'] },
          { model: Categoria, attributes: ['nome', 'description'] },
          { model: Produto, attributes: ['nome', 'preco_venda'], required: false } // required: false para LEFT JOIN
        ]
      });
      return res.json({ success: true, transactions: transacoes });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const transacao = await Transacao.findByPk(id, {
        include: [
          { model: Usuario, attributes: ['nome', 'email'] },
          { model: Categoria, attributes: ['nome', 'description'] },
          { model: Produto, attributes: ['nome', 'preco_venda'], required: false }
        ]
      });
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
      const { tipo, valor, descricao, id_categoria, data, id_produto } = req.body; // Alterado
      const id_usuario = req.userId; // Assumindo que req.userId é populado por um middleware de autenticação

      if (!tipo || !valor || !descricao || !id_categoria || !data || !id_usuario) { // Alterado
        return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
      }

      const nova = await Transacao.create({
        tipo,
        valor,
        descricao,
        id_categoria, // Alterado
        data,
        id_produto: id_produto || null, // Alterado
        id_usuario // Adicionado
      });

      return res.status(201).json({ success: true, transaction: nova });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedFields = { ...req.body };

      // Mapear campos antigos para novos, se presentes
      if (updatedFields.categoria) {
        updatedFields.id_categoria = updatedFields.categoria;
        delete updatedFields.categoria;
      }
      if (updatedFields.produtoId) {
        updatedFields.id_produto = updatedFields.produtoId;
        delete updatedFields.produtoId;
      }

      const transacao = await Transacao.findByPk(id);
      if (!transacao) return res.status(404).json({ error: 'Transação não encontrada.' });

      await transacao.update(updatedFields);
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
