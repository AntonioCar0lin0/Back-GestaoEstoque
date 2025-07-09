const jwt       = require('jsonwebtoken');
const Usuario   = require('../models/Usuario');   // modelo Sequelize
require('dotenv').config();                       // garante JWT_SECRET

module.exports = {
  //  POST /auth/register
  async register(req, res) {
    try {
      const {
        nome, cpf, email, password,
        data_nascimento, rua, cidade, bairro, pais,
      } = req.body;

      if (!nome || !cpf || !email || !password) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
      }

      // Impede CPF duplicado
      const jaExiste = await Usuario.findOne({ where: { cpf } });
      if (jaExiste) {
        return res.status(409).json({ error: 'CPF já cadastrado.' });
      }

      // Cria usuário (hook do modelo faz o hash da senha)
      const usuario = await Usuario.create({
        nome, cpf, email, password,
        data_nascimento, rua, cidade, bairro, pais,
      });

      return res.status(201).json({
        message: 'Usuário criado com sucesso',
        id: usuario.id,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  //POST /auth/login

  async login(req, res) {
    try {
      const { cpf, password } = req.body;

      if (!cpf || !password) {
        return res.status(400).json({ error: 'CPF e senha obrigatórios.' });
      }

      //Busca usuário
      const usuario = await Usuario.scope(null).findOne({ where: { cpf } });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      // Verifica a senha usando o método de instância do modelo
      const senhaOk = await usuario.checkPassword(password);
      if (!senhaOk) {
        return res.status(401).json({ error: 'Senha incorreta.' });
      }

      // Gera JWT
      const token = jwt.sign(
        { userId: usuario.id },
        process.env.JWT_SECRET || 'super-secret',
        { expiresIn: '1h' },
      );

      return res.json({ token });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
