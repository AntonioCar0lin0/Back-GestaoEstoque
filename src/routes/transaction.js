const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/', authMiddleware, TransactionController.create);
router.get('/', authMiddleware, TransactionController.list);
router.get('/:id', authMiddleware, TransactionController.getById);
router.put('/:id', authMiddleware, TransactionController.update);
router.delete('/:id', authMiddleware, TransactionController.remove);

module.exports = router;
