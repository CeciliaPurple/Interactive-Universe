const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, 'meusegredo', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado' });
    }

    // Força o TIPO para maiúsculas (caso venha "adm", "Adm", etc.)
    if (user.TIPO) {
      user.TIPO = user.TIPO.toUpperCase();
    } else {
      return res.status(403).json({ error: 'Token não contém o campo TIPO' });
    }

    // Log para debug
    console.log('Usuário autenticado:', user);

    req.user = user;
    next();
  });
};

module.exports = authMiddleware;
