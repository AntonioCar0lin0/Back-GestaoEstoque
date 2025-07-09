/************************************************************
   Funções para criar, pesquisar, listar produtos
 ************************************************************/

   const Product = require('../models/Produto');
   const { Op } = require('sequelize');
   
   module.exports = {
     // Cria um novo produto
     createProduct: async (req, res) => {
       try {
         const {
           nome,
           categoria,
           quantidade_estoque,
           preco_compra,
           preco_venda
         } = req.body;
   
         if (!nome || !categoria || quantidade_estoque == null || preco_compra == null || preco_venda == null) {
           return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
         }
   
         const newProduct = await Product.create({
           nome,
           categoria,
           quantidade_estoque,
           preco_compra,
           preco_venda
         });
   
         return res.status(201).json(newProduct);
       } catch (error) {
         return res.status(500).json({ error: error.message });
       }
     },
   
     // Lista todos os produtos
     getAllProducts: async (req, res) => {
       try {
         const products = await Product.findAll();
         return res.status(200).json(products);
       } catch (error) {
         return res.status(500).json({ error: error.message });
       }
     },
   
     // Busca produto por ID
     getProductById: async (req, res) => {
       try {
         const { id } = req.params;
   
         if (!id) {
           return res.status(400).json({ error: 'O ID do produto é obrigatório.' });
         }
   
         const product = await Product.findByPk(id);
   
         if (!product) {
           return res.status(404).json({ message: 'Produto não encontrado.' });
         }
   
         return res.status(200).json(product);
       } catch (error) {
         return res.status(500).json({ error: error.message });
       }
     },
   
     // Atualiza um produto
     updateProduct: async (req, res) => {
       try {
         const { id } = req.params;
         const updatedFields = { ...req.body };
   
         const product = await Product.findByPk(id);
         if (!product) {
           return res.status(404).json({ error: 'Produto não encontrado.' });
         }
   
         const updated = await product.update(updatedFields);
         return res.status(200).json(updated);
       } catch (error) {
         return res.status(500).json({ error: error.message });
       }
     },
   
     // Deleta um produto
     deleteProduct: async (req, res) => {
       try {
         const { id } = req.params;
   
         const product = await Product.findByPk(id);
         if (!product) {
           return res.status(404).json({ error: 'Produto não encontrado.' });
         }
   
         await product.destroy();
         return res.json({ message: 'Produto removido com sucesso.' });
       } catch (error) {
         return res.status(500).json({ error: error.message });
       }
     }
   }; 
   //teste aaaaaaaa