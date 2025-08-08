/************************************************************
 * ARQUIVO: src/routes/productRoutes.js
 * RESPONSABILIDADE: Definição das rotas de Produto e Favoritos
 ************************************************************/
const express = require('express');
const router = express.Router();

// Importar nosso controller
const ProductController = require('../controllers/ProductController');


//Cria novo produto
router.post('/', ProductController.createProduct);

//Busca e lista todos os produtos
router.get('/', ProductController.getAllProducts)

// Rotas de análise para dashboard (DEVEM vir antes de /:id)
router.get('/analysis/dashboard', ProductController.getDashboardAnalysis);
router.get('/analysis/most-lucrative', ProductController.getMostLucrativeProducts);

//Busca produtos por ID
router.get('/:id', ProductController.getProductById)

//Atualizar um produto por ID
router.put('/:id', ProductController.updateProduct)

//Deleta um produto por ID 
router.delete('/:id', ProductController.deleteProduct)


// Exportamos o router para ser usado no app.js
module.exports = router;

