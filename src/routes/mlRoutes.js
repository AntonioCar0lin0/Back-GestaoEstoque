const express = require('express');
const router = express.Router();
const { callMLApi } = require('../services/mlService');

/**
 * GET /ml/teste
 * Faz uma chamada simples à API de ML e devolve a resposta bruta.
 */
router.get('/teste', async (_req, res) => {
  try {
    // Payload mínimo; adapte quando souber o formato certo
    const payload = { ping: 'hello world' };

    const data = await callMLApi(payload);
    res.status(200).json({ sucesso: true, data });
  } catch (e) {
    res.status(500).json({ sucesso: false, erro: e.message });
  }
});

module.exports = router;
