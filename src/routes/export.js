const express = require('express');
const router = express.Router();
const ExportController = require('../controllers/ExportController');

router.get('/products', ExportController.exportProducts);
router.get('/transactions', ExportController.exportTransactions);
router.get('/reports', ExportController.exportReport);

module.exports = router;
