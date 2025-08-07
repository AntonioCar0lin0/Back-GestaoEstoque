const jwt       = require('jsonwebtoken');
const Usuario   = require('../models/Usuario');
const { Op } = require('sequelize');
const crypto    = require('crypto');
require('dotenv').config();                       // garante JWT_SECRET


const TOKEN_LIFETIME = 30 * 60 * 1000;            // 30 min em milissegundos
const FRONT_URL     = 'http://localhost:3000';

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
  async forgotPassword(req, res) {
    try {
      const { email, cpf } = req.body;
      if (!email && !cpf) {
        return res.status(400).json({ error: 'Informe e-mail ou CPF.' });
      }

      const usuario = await Usuario.findOne({ where: email ? { email } : { cpf } });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      /* Gera token randômico e salva hash + expiração ------ */
      const rawToken  = crypto.randomBytes(32).toString('hex');
      const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

      usuario.reset_token   = tokenHash;
      usuario.reset_expires = Date.now() + TOKEN_LIFETIME;
      await usuario.save();

      /* Link de redefinição -------------------------------- */
      const link = `${FRONT_URL}/reset-password?token=${rawToken}`;


      console.log(`[reset-password] link para ${usuario.email || usuario.cpf}: ${link}`);

      return res.json({ message: 'Link de recuperação enviado.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token e nova senha são obrigatórios.' });
      }

      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

      const usuario = await Usuario.scope(null).findOne({
        where: {
          reset_token: tokenHash,
          reset_expires: { [Op.gt]: Date.now() },
        },
      });

      if (!usuario) {
        return res.status(400).json({ error: 'Token inválido ou expirado.' });
      }

      /* Atualiza senha e limpa campos de reset ------------- */
      usuario.password      = newPassword;   // hook hash
      usuario.reset_token   = null;
      usuario.reset_expires = null;
      await usuario.save();

      return res.json({ message: 'Senha redefinida com sucesso.'});
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
