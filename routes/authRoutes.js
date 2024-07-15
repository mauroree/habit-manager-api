const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registrarUsuario);
router.post('/login', authController.autenticarUsuario);

module.exports = router;
