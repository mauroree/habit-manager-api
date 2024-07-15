const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const Usuario = require('../models/usuarioModel');

// Registrar um novo usuário
exports.registrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verificar se o usuário já existe
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: 'O usuário já existe' });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    // Criar novo usuário
    usuario = new Usuario({
      nome,
      email,
      senha: senhaCriptografada
    });

    // Salvar usuário no banco de dados
    await usuario.save();

    // Gerar token JWT
    const payload = {
      usuario: {
        id: usuario.id
      }
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).send('Erro no servidor ao registrar usuário');
  }
};

// Autenticar usuário e gerar token JWT
exports.autenticarUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Verificar a senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const payload = {
      usuario: {
        id: usuario.id
      }
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    res.status(500).send('Erro no servidor ao autenticar usuário');
  }
};
