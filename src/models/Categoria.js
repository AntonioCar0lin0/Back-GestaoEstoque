const { DataTypes } = require('sequelize');
const sequelize     = require('../config/database');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING(7), 
    allowNull: true,
    validate: {
      is: /^#([0-9A-F]{3}){1,2}$/i
    }
  }
}, {
  tableName:  'categorias',
  timestamps: true,
});

Categoria.associate = function (models) {
  Categoria.hasMany(models.Produto, {
    foreignKey: 'id_categoria'
  });
};

module.exports = Categoria;
