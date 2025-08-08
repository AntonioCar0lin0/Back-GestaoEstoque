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
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
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
  },
  // NOVO: relacionamento com Usuario
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'usuarios', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'produtos',
  timestamps: true,
  indexes: [
    { fields: ['userId'] },
    { fields: ['categoria'] },
  ],
});

// Opcional: associe no registry de models
Produto.associate = (models) => {
  Produto.belongsTo(models.Usuario, { foreignKey: 'userId', as: 'usuario' });
  Produto.hasMany(models.Transacao, { foreignKey: 'produtoId', as: 'transacoes' });
};

module.exports = Produto;