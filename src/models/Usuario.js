const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{isEmail: true},
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  rua: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reset_token: DataTypes.STRING,
  reset_expires: DataTypes.DATE,
}, {
  tableName:   'usuarios',
  timestamps:  true,

  // DEFAULT SCOPE — exclui o hash das consultas comuns (findAll, etc.)
  defaultScope: {
    attributes: { exclude: ['password', 'reset_token', 'reset_expires'] },
  },

  // HOOK beforeSave — gera hash sempre que 'password' mudar
  hooks: {
    async beforeSave(usuario) {
      if (usuario.changed('password')) {
        usuario.password = await bcrypt.hash(usuario.password, 10);
      }
    }
  }
});

// MÉTODO DE INSTÂNCIA — compara senha em texto-plano com o hash salvo
Usuario.prototype.checkPassword = function (passwordEmTexto) {
  return bcrypt.compare(passwordEmTexto, this.password);
};

module.exports = Usuario;
