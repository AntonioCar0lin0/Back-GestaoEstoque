const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Removido 'categoria' string, será uma chave estrangeira
  id_categoria: { // Nova chave estrangeira para Categoria
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_usuario_criador: { // Nova chave estrangeira para o usuário que criou o produto
    type: DataTypes.INTEGER,
    allowNull: true // Pode ser nulo se o produto não tiver um criador específico
  },
  quantidade_estoque: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  preco_compra: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  preco_venda: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'produtos',
  timestamps: true
});

module.exports = Produto;
