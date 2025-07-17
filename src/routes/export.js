const express = require('express');
const router = express.Router();
const ExportController = require('../controllers/ExportController');

// Exportar produtos
router.get('/products', ExportController.products);

// Exportar transações
router.get('/transactions', ExportController.transactions);

// Exportar relatório completo
router.get('/reports', ExportController.reports);

module.exports = router;
