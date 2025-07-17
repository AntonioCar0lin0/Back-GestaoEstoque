const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');

// Busca todas as transações
router.get('/', TransactionController.list);

// Buscar transação por ID
router.get('/:id', TransactionController.getById);

// Adiciona uma transação nova
router.post('/', TransactionController.create);

// Atualiza uma transação nova pelo ID
router.put('/:id', TransactionController.update);

// Remove uma transação pelo ID
router.delete('/:id', TransactionController.remove);

module.exports = router;
