/************************************************************
   Funções para criar, pesquisar, listar produtos
 ************************************************************/

   const Product = require('../models/Produto');
  const { Op, literal, col } = require('sequelize');
   
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
     getProductAnalysis: async (req, res) => {
       try {
         // Produtos mais lucrativos
         const mostLucrative = await Product.findAll({
           attributes: [
             'id',
             'nome',
             'preco_compra',
             'preco_venda',
             [literal('(preco_venda - preco_compra)'), 'lucro_unitario']
           ],
           where: {
             quantidade_estoque: { [Op.gt]: 0 },
             preco_venda: { [Op.gt]: col('preco_compra') }

           },
           order: [[literal('lucro_unitario'), 'DESC']],

           limit: 3
         });

         const lowStock = await Product.findAll({
           where: {
             quantidade_estoque: { [Op.lte]: 10 } 
           },
           order: [['quantidade_estoque', 'ASC']],
           limit: 5
         });

         const totalProducts = await Product.count();
         const lowStockCount = await Product.count({
           where: { quantidade_estoque: { [Op.lte]: 10 } }
         });

         return res.status(200).json({
           produtos_mais_lucrativos: mostLucrative.map(p => ({
             nome: p.nome,
             lucro_unitario: parseFloat(p.getDataValue('lucro_unitario')).toFixed(2)
           })),
           produtos_estoque_baixo: lowStock.map(p => ({
             nome: p.nome,
             quantidade_estoque: p.quantidade_estoque
           })),
           estatisticas: {
             total_produtos: totalProducts,
             produtos_estoque_baixo: lowStockCount
           }
         });
       } catch (error) {
         return res.status(500).json({ error: error.message });
       }
     },
       getMostLucrativeProducts: async (req, res) => {
       try {
         const products = await Product.findAll({
           attributes: [
             'id',
             'nome',
             'categoria',
             'quantidade_estoque',
             'preco_compra',
             'preco_venda',
             [literal('(preco_venda - preco_compra)'), 'lucro_unitario'],
              [literal('(preco_venda - preco_compra) * quantidade_estoque'), 'lucro_total']

           ],
           where: {
             quantidade_estoque: {
               [Op.gt]: 0 
             },
             preco_venda: {
              [Op.gt]: col('preco_compra')
            }
           },
           order:  [[literal('lucro_unitario'), 'DESC']],
           limit: 3
         });

         const formattedProducts = products.map(product => ({
           id: product.id,
           nome: product.nome,
           categoria: product.categoria,
           quantidade_estoque: product.quantidade_estoque,
           preco_compra: parseFloat(product.preco_compra),
           preco_venda: parseFloat(product.preco_venda),
           lucro_unitario: parseFloat(product.getDataValue('lucro_unitario')).toFixed(2),
           lucro_total: parseFloat(product.getDataValue('lucro_total')).toFixed(2)
         }));
   
         return res.status(200).json(formattedProducts);
       } catch (error) {
         return res.status(500).json({ error: error.message });
       }
     
      }
   
   }; 


