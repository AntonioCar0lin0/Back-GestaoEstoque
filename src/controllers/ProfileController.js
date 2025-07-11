const bcrypt  = require('bcrypt');
const Usuario = require('../models/Usuario');

/* GET /api/user/profile ---------------------------------- */
exports.getProfile = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.userId);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });
    return res.json(usuario); // defaultScope já esconde password/reset_*
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* PUT /api/user/profile ---------------------------------- */
exports.updateProfile = async (req, res) => {
  try {
    const { nome, email, cpf, data_nascimento, rua, cidade, bairro, pais } = req.body;
    const usuario = await Usuario.findByPk(req.userId);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });

    /* Evita conflito de e-mail ou CPF com outros usuários */
    if (email || cpf) {
      const jaExiste = await Usuario.findOne({
        where: {
          id: { [require('sequelize').Op.ne]: req.userId },
          ...(email && { email }),
          ...(cpf   && { cpf   }),
        },
      });
      if (jaExiste) return res.status(409).json({ error: 'E-mail ou CPF já usado.' });
    }

    await usuario.update({ nome, email, cpf, data_nascimento, rua, cidade, bairro, pais });
    return res.json({ message: 'Perfil atualizado com sucesso.' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* PUT /api/user/password --------------------------------- */
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Senha atual e nova senha são obrigatórias.' });
    }

    const usuario = await Usuario.scope(null).findByPk(req.userId);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });

    const ok = await usuario.checkPassword(currentPassword);
    if (!ok) return res.status(401).json({ error: 'Senha atual incorreta.' });

    usuario.password = newPassword; // hook gera hash
    await usuario.save();

    return res.json({ message: 'Senha alterada com sucesso.' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
