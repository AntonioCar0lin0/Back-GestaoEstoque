const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transacao = sequelize.define('Transacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: DataTypes.ENUM('receita', 'despesa'),
    allowNull: false
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  produtoId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'transacoes',
  timestamps: true
});

module.exports = Transacao;
