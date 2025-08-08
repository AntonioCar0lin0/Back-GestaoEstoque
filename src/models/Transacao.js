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
  tableName: 'transacoes',
  timestamps: true,
  indexes: [
    { fields: ['userId'] },
    { fields: ['produtoId'] },
    { fields: ['data'] },
  ],
});

// Opcional: associe no registry de models
Transacao.associate = (models) => {
  Transacao.belongsTo(models.Usuario, { foreignKey: 'userId', as: 'usuario' });
  Transacao.belongsTo(models.Produto, { foreignKey: 'produtoId', as: 'produto' });
};

module.exports = Transacao;