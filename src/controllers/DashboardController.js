/************************************************************
   Funções para retornar o resumo do dashboard
 ************************************************************/
const Produto = require('../models/Produto');
const Venda = require('../models/Venda');
const Transacao = require('../models/Transacao');
const { Op } = require('sequelize');


module.exports = {
  summary: async (req, res) => {
    try {
      // CHANGE: filtro base por usuário
      const whereUser = { userId: req.userId };

      // CHANGE: somatórios escopados por usuário
      const totalRevenue = await Transacao.sum('valor', { where: { ...whereUser, tipo: 'receita' } });
      const totalExpenses = await Transacao.sum('valor', { where: { ...whereUser, tipo: 'despesa' } });
      const profit = (totalRevenue || 0) - (totalExpenses || 0);

      // CHANGE: contagens escopadas por usuário
      const totalProducts = await Produto.count({ where: whereUser });
      const lowStockProducts = await Produto.count({ where: { ...whereUser, quantidade_estoque: { [Op.lt]: 5 } } });

      // CHANGE: transações recentes do usuário
      const recentTransactions = await Transacao.findAll({
        where: whereUser,
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
