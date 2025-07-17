require('dotenv').config();
const axios = require('axios');

/**
 * Faz um POST na API de ML.
 * @param {Object} payload – Qualquer JSON que a API aceite.
 * @returns {Promise<Object>} – Resposta da API.
 */
async function callMLApi(payload) {
  const url   = process.env.ML_API_URL;
  const token = process.env.ML_API_TOKEN; // se não precisar, remova

  try {
    const resp = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      timeout: 10000   // 10 s
    });

    return resp.data; // devolve a resposta da API
  } catch (err) {
    // Log completo p/ debug
    console.error('ML API error:', err.response?.status, err.message);
    throw err; // propaga pra quem chamou
  }
}

module.exports = { callMLApi };
