const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');
const Venda = require('./Venda');

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

// Relacionamentos
ItemVenda.belongsTo(Produto, { foreignKey: 'id_produto' });
ItemVenda.belongsTo(Venda, { foreignKey: 'id_venda' });

Produto.hasMany(ItemVenda, { foreignKey: 'id_produto' });
Venda.hasMany(ItemVenda, { foreignKey: 'id_venda' });

module.exports = ItemVenda;
