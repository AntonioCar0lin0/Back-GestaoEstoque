const express = require('express');
const router = express.Router();
const { getForecastGraph } = require('../controllers/MLController');

router.get('/forecast', getForecastGraph);

module.exports = router;
