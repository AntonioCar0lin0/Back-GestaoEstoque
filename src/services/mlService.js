const axios = require('axios');
require('dotenv').config();

async function callMLApi({ tipo }) {
  const url = `${process.env.ML_API_URL}/analytics/grafico-json?tipo=${tipo}`;

  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (err) {
    console.error('ML API error:', err.response?.status, err.message);
    throw err;
  }
}

module.exports = { callMLApi };
