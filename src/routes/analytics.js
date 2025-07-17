const express = require('express');
const router = express.Router();
const AnalyticsController = require('../controllers/AnalyticsController');

// Série temporal: /api/analytics/time-series
router.get('/time-series', AnalyticsController.timeSeries);

// Previsões: /api/analytics/predictions
router.get('/predictions', AnalyticsController.predictions);

module.exports = router;
