const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');
const { verificarToken } = require('../config/authConfig'); 

router.get('/', verificarToken, medicamentoController.listarMedicamentos);
router.post('/', verificarToken, medicamentoController.criarMedicamento);
router.put('/:id', verificarToken, medicamentoController.atualizarMedicamento);
router.delete('/:id', verificarToken, medicamentoController.removerMedicamento);

module.exports = router;
