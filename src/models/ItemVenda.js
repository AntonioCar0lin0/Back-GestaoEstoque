const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// Produto e Venda não precisam ser importados aqui, pois as associações serão centralizadas

const ItemVenda = sequelize.define('ItemVenda', {
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  preco_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'itens_venda',
  timestamps: true
});

module.exports = ItemVenda;
