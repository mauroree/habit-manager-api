const express = require('express');
const router = express.Router();
const habitoController = require('../controllers/habitoController');
const { verificarToken } = require('../config/authConfig'); 

router.get('/', verificarToken, habitoController.listarHabitos);
router.post('/', verificarToken, habitoController.criarHabito);
router.put('/:id', verificarToken, habitoController.atualizarHabito);
router.delete('/:id', verificarToken, habitoController.removerHabito);

module.exports = router;
