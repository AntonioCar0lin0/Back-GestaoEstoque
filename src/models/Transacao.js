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
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  id_produto: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'transacoes',
  timestamps: true
});


Transacao.associate = function(models) {
  Transacao.belongsTo(models.Usuario, {
    foreignKey: 'id_usuario'
  });
  Transacao.belongsTo(models.Categoria, {
    foreignKey: 'id_categoria'
  });
  Transacao.belongsTo(models.Produto, {
    foreignKey: 'id_produto'
  });
};

module.exports = Transacao;
