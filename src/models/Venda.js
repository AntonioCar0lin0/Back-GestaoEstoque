const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

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

// Relacionamento
Venda.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Usuario.hasMany(Venda, { foreignKey: 'id_usuario' });

module.exports = Venda;
