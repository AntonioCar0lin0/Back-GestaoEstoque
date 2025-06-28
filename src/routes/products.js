/************************************************************
 * ARQUIVO: src/routes/productRoutes.js
 * RESPONSABILIDADE: Definição das rotas de Produto e Favoritos
 ************************************************************/
const express = require('express');
const router = express.Router();

// Importar nosso controller
const ProductController = require('../controllers/ProductController');

// nota para sérgio quando for criar algo -> exemplo: router.post('/', ProductController.createProduct);



// Exportamos o router para ser usado no app.js
module.exports = router;
