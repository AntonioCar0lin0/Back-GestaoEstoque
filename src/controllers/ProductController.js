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
     },

     // Análise para dashboard
     getDashboardAnalysis: async (req, res) => {
       try {
         // Buscar todos os produtos
         const allProducts = await Product.findAll();
         
         // Produtos com estoque baixo (menos de 50 unidades)
         const lowStockProducts = allProducts.filter(p => p.quantidade_estoque < 50);
         
         // Calcular lucro unitário para cada produto
         const productsWithProfit = allProducts.map(product => {
           const lucroUnitario = parseFloat(product.preco_venda) - parseFloat(product.preco_compra);
           return {
             ...product.toJSON(),
             lucro_unitario: lucroUnitario.toFixed(2)
           };
         });
         
         // Produtos mais lucrativos (top 5)
         const mostProfitable = productsWithProfit
           .sort((a, b) => parseFloat(b.lucro_unitario) - parseFloat(a.lucro_unitario))
           .slice(0, 5);
         
         const response = {
           produtos_estoque_baixo: lowStockProducts.map(p => ({
             nome: p.nome,
             quantidade_estoque: p.quantidade_estoque,
             lucro_unitario: (parseFloat(p.preco_venda) - parseFloat(p.preco_compra)).toFixed(2)
           })),
           produtos_mais_lucrativos: mostProfitable.map(p => ({
             nome: p.nome,
             quantidade_estoque: p.quantidade_estoque,
             lucro_unitario: p.lucro_unitario
           })),
           estatisticas: {
             total_produtos: allProducts.length,
             produtos_estoque_baixo: lowStockProducts.length
           }
         };
         
         return res.status(200).json(response);
       } catch (error) {
         return res.status(500).json({ error: error.message });
       }
     },

     // Produtos mais lucrativos
     getMostLucrativeProducts: async (req, res) => {
       try {
         const allProducts = await Product.findAll();
         
         const productsWithProfit = allProducts.map(product => {
           const lucroUnitario = parseFloat(product.preco_venda) - parseFloat(product.preco_compra);
           const lucroTotal = lucroUnitario * product.quantidade_estoque;
           
           return {
             nome: product.nome,
             quantidade_estoque: product.quantidade_estoque,
             preco_compra: product.preco_compra,
             preco_venda: product.preco_venda,
             lucro_unitario: lucroUnitario.toFixed(2),
             lucro_total: lucroTotal.toFixed(2)
           };
         });
         
         // Ordenar por lucro total decrescente
         const sortedProducts = productsWithProfit.sort((a, b) => 
           parseFloat(b.lucro_total) - parseFloat(a.lucro_total)
         );
         
         return res.status(200).json(sortedProducts);
       } catch (error) {
         return res.status(500).json({ error: error.message });
       }
     }
   }; 


