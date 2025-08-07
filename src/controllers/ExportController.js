/************************************************************
   Funções para exportar produtos, transações e relatórios
 ************************************************************/
const { Parser } = require('json2csv');
const Produto = require('../models/Produto');
const Transacao = require('../models/Transacao');
const Categoria = require('../models/Categoria');
const Usuario = require('../models/Usuario');
const moment = require('moment');

module.exports = {
  exportProducts: async (req, res) => {
    try {
      const produtos = await Produto.findAll({
        include: [
          { model: Categoria, attributes: ['nome'], required: false },
          { model: Usuario, as: 'UsuarioCriador', attributes: ['nome'], required: false }
        ]
      });

      const productsData = produtos.map(p => ({
        id: p.id,
        nome: p.nome,
        categoria: p.Categoria ? p.Categoria.nome : 'N/A', // Nome da categoria
        usuario_criador: p.UsuarioCriador ? p.UsuarioCriador.nome : 'N/A', // Nome do criador
        quantidade_estoque: p.quantidade_estoque,
        preco_compra: p.preco_compra,
        preco_venda: p.preco_venda,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
      }));

      const csv = new Parser().parse(productsData);

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
      const where = {};
      if (startDate && endDate) {
        where.data = {
          [Op.between]: [startDate, endDate]
        };
      }

      const transacoes = await Transacao.findAll({
        where,
        include: [
          { model: Usuario, attributes: ['nome', 'email'], required: false },
          { model: Categoria, attributes: ['nome'], required: false },
          { model: Produto, attributes: ['nome'], required: false }
        ]
      });

      const transactionsData = transacoes.map(t => ({
        id: t.id,
        tipo: t.tipo,
        valor: t.valor,
        descricao: t.descricao,
        categoria: t.Categoria ? t.Categoria.nome : 'N/A', // Nome da categoria
        data: t.data,
        produto: t.Produto ? t.Produto.nome : 'N/A', // Nome do produto
        usuario: t.Usuario ? t.Usuario.nome : 'N/A', // Nome do usuário
        createdAt: t.createdAt,
        updatedAt: t.updatedAt
      }));

      const csv = new Parser().parse(transactionsData);

      res.header('Content-Type', 'text/csv');
      res.attachment('transacoes.csv');
      return res.send(csv);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  exportReport: async (req, res) => {
    try {
      const transacoes = await Transacao.findAll({
        include: [
          { model: Usuario, attributes: ['nome', 'email'], required: false },
          { model: Categoria, attributes: ['nome'], required: false },
          { model: Produto, attributes: ['nome'], required: false }
        ]
      });

      const reportData = transacoes.map(t => ({
        id: t.id,
        tipo: t.tipo,
        valor: t.valor,
        descricao: t.descricao,
        categoria: t.Categoria ? t.Categoria.nome : 'N/A',
        data: t.data,
        produto: t.Produto ? t.Produto.nome : 'N/A',
        usuario: t.Usuario ? t.Usuario.nome : 'N/A',
        createdAt: t.createdAt,
        updatedAt: t.updatedAt
      }));

      const csv = new Parser().parse(reportData);

      res.header('Content-Type', 'text/csv');
      res.attachment('relatorio.csv');
      return res.send(csv);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
