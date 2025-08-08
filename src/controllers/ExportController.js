/************************************************************
   Funções para exportar produtos, transações e relatórios
 ************************************************************/
const { Parser } = require('json2csv');
const Produto = require('../models/Produto');
const Transacao = require('../models/Transacao');
const moment = require('moment');
const { Op } = require('sequelize'); // CHANGE: importar Op para filtro por período

module.exports = {
  exportProducts: async (req, res) => {
    try {
      // CHANGE: exportar somente produtos do usuário autenticado
      const produtos = await Produto.findAll({ where: { userId: req.userId } });
      const csv = new Parser().parse(produtos);

      res.header('Content-Type', 'text/csv');
      res.attachment('produtos.csv');
      return res.send(csv);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  exportTransactions: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      // CHANGE: exportar somente transações do usuário autenticado (e período opcional)
      const where = { userId: req.userId };
      if (startDate && endDate) {
        where.data = {
          [Op.between]: [startDate, endDate]
        };
      }

      const transacoes = await Transacao.findAll({ where });
      const csv = new Parser().parse(transacoes);

      res.header('Content-Type', 'text/csv');
      res.attachment('transacoes.csv');
      return res.send(csv);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  exportReport: async (req, res) => {
    try {
      // CHANGE: exportar relatório somente com dados do usuário autenticado
      const transacoes = await Transacao.findAll({ where: { userId: req.userId } });
      const csv = new Parser().parse(transacoes);

      res.header('Content-Type', 'text/csv');
      res.attachment('relatorio.csv');
      return res.send(csv);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
