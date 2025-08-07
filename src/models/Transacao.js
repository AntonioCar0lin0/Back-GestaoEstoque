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
  // Removido 'categoria' string, será uma chave estrangeira
  id_categoria: { // Nova chave estrangeira para Categoria
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  // Removido 'produtoId', será uma chave estrangeira formal
  id_produto: { // Nova chave estrangeira para Produto
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_usuario: { // Nova chave estrangeira para Usuario (cliente)
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'transacoes',
  timestamps: true
});

module.exports = Transacao;
