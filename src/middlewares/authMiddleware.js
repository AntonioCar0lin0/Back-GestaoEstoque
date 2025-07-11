const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'super-secret';

//Intercepta requisições protegidas, valida o token e injeta req.userId para uso posterior.
 
module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não informado.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    return next();
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
