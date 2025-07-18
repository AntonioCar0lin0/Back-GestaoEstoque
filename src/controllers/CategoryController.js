/************************************************************
   Funções para criar, listar, atualizar e deletar categorias
 ************************************************************/
const Categoria = require('../models/Categoria');
const { Op } = require('sequelize');

module.exports = {
  // Lista todas as categorias
  getAllCategories: async (_req, res) => {
    try {
      const categorias = await Categoria.findAll({ order: [['id', 'ASC']] });
      return res.status(200).json(categorias);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Cria nova categoria
  createCategory: async (req, res) => {
    try {
      const { nome, description, color } = req.body;

      if (!nome) return res.status(400).json({ error: 'Nome é obrigatório.' });

      const exists = await Categoria.findOne({ where: { nome } });
      if (exists) return res.status(409).json({ error: 'Categoria já existe.' });

      const categoria = await Categoria.create({ nome, description, color });
      return res.status(201).json(categoria);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Atualiza uma categoria existente
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, description, color } = req.body;

      const categoria = await Categoria.findByPk(id);
      if (!categoria) return res.status(404).json({ error: 'Categoria não encontrada.' });

      await categoria.update({ nome, description, color });
      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Deleta uma categoria
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const categoria = await Categoria.findByPk(id);
      if (!categoria) return res.status(404).json({ error: 'Categoria não encontrada.' });

      await categoria.destroy();
      return res.json({ message: 'Categoria removida com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
