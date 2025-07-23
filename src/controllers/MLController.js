const { callMLApi } = require('../services/mlService');

module.exports = {
  async getForecastGraph(req, res) {
    try {
      const tipo = req.query.tipo || 'receita';
      const response = await callMLApi({
        tipo // ou qualquer payload necessário
      });
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao consultar o serviço de previsão' });
    }
  }
};
