const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const gerarToken = (idUsuario) => {
  return jwt.sign({ id: idUsuario }, JWT_SECRET, { expiresIn: '1h' });
};

const verificarToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ msg: 'Acesso negado. Token não fornecido.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token inválido.' });
  }
};

module.exports = { gerarToken, verificarToken };
