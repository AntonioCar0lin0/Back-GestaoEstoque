/************************************************************
   Funções para retornar o resumo do dashboard
 ************************************************************/
const Produto = require('../models/Produto');
const Venda = require('../models/Venda');
const Transacao = require('../models/Transacao');

module.exports = {
  summary: async (req, res) => {
    try {
      const totalRevenue = await Transacao.sum('valor', { where: { tipo: 'receita' } });
      const totalExpenses = await Transacao.sum('valor', { where: { tipo: 'despesa' } });
      const profit = (totalRevenue || 0) - (totalExpenses || 0);

      const totalProducts = await Produto.count();
      const lowStockProducts = await Produto.count({ where: { quantidade_estoque: { [Op.lt]: 5 } } });

      const recentTransactions = await Transacao.findAll({
        limit: 5,
        order: [['data', 'DESC']]
      });

      return res.status(200).json({
        success: true,
        summary: {
          totalProducts,
          lowStockProducts,
          totalRevenue,
          totalExpenses,
          profit,
          recentTransactions
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
