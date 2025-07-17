//realizar alteraçoes necessarias posteriormente

exports.timeSeries = async (req, res) => {
  try {
    const vendas = await Venda.findAll({
      attributes: [
        [sequelize.fn('date_trunc', 'month', sequelize.col('data_venda')), 'mes'],
        [sequelize.fn('sum', sequelize.col('valor')), 'total_vendas'],
      ],
      group: [sequelize.fn('date_trunc', 'month', sequelize.col('data_venda'))],
      order: [[sequelize.fn('date_trunc', 'month', sequelize.col('data_venda')), 'ASC']],
    });

    return res.json(vendas);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// previsão com base na média móvel
exports.predictions = async (req, res) => {
  try {
    const vendas = await Venda.findAll({
      attributes: [[sequelize.fn('sum', sequelize.col('valor')), 'total_vendas']],
      group: ['data_venda'],
      order: [['data_venda', 'ASC']],
    });

    // Algoritmo de média móvel
    const previsao = vendas.reduce((acc, curr) => acc + curr.total_vendas, 0) / vendas.length;

    return res.json({ previsao });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
