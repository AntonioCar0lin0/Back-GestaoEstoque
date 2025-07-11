const Categoria = require('../models/Categoria');

exports.list = async (_req, res) => {
  try {
    const categorias = await Categoria.findAll({ order: [['id', 'ASC']] });
    return res.json(categorias);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ error: 'Nome é obrigatório.' });

    /* impede duplicidade */
    const existe = await Categoria.findOne({ where: { nome } });
    if (existe)  return res.status(409).json({ error: 'Categoria já existe.' });

    const categoria = await Categoria.create({ nome });
    return res.status(201).json(categoria);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
