const express            = require('express');
const router             = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.get('/categories',  CategoryController.list);
router.post('/categories', CategoryController.create);

module.exports = router;
