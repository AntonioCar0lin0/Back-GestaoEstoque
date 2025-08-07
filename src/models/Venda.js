const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// Usuario não precisa ser importado aqui, pois as associações serão centralizadas

const Venda = sequelize.define('Venda', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data_venda: {
    type: DataTypes.DATE,
    allowNull: false
  },
  receita: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  custo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  lucro: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'vendas',
  timestamps: true
});

// Relacionamento com Usuario será definido em index.js
// Venda.belongsTo(Usuario, { foreignKey: 'id_usuario' }); // Removido daqui

module.exports = Venda;
