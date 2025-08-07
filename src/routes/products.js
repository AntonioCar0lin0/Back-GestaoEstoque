/************************************************************
 * ARQUIVO: src/routes/productRoutes.js
 * RESPONSABILIDADE: Definição das rotas de Produto e Favoritos
 ************************************************************/
const express = require('express');
const router = express.Router();

// Importar nosso controller
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/authMiddleware');



//Cria novo produto
router.post('/', authMiddleware, ProductController.createProduct);

//Busca e lista todos os produtos
router.get('/', authMiddleware, ProductController.getAllProducts)

//Busca produtos por ID
router.get('/:id', authMiddleware,ProductController.getProductById)

//Atualizar um produto por ID
router.put('/:id', authMiddleware,ProductController.updateProduct)

//Deleta um produto por ID 
router.delete('/:id', authMiddleware,ProductController.deleteProduct)


// Exportamos o router para ser usado no app.js
module.exports = router;

