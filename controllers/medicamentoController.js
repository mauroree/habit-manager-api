// controllers/medicamentoController.js
const Medicamento = require('../models/medicamentoModel');

// Listar todos os medicamentos
exports.listarMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Medicamento.find().populate('habito', 'nome');
    res.json(medicamentos);
  } catch (error) {
    console.error('Erro ao listar medicamentos:', error);
    res.status(500).send('Erro no servidor ao buscar medicamentos');
  }
};

// Criar um novo medicamento
exports.criarMedicamento = async (req, res) => {
  try {
    const { nome, horario, vezesAoDia, habito } = req.body;
    const novoMedicamento = new Medicamento({ nome, horario, vezesAoDia, habito });
    const medicamentoSalvo = await novoMedicamento.save();
    res.status(201).json(medicamentoSalvo);
  } catch (error) {
    console.error('Erro ao criar medicamento:', error);
    res.status(500).send('Erro no servidor ao criar medicamento');
  }
};

// Atualizar um medicamento existente
exports.atualizarMedicamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, horario, vezesAoDia, habito } = req.body;
    const medicamentoAtualizado = await Medicamento.findByIdAndUpdate(
      id,
      { nome, horario, vezesAoDia, habito },
      { new: true }
    );
    if (!medicamentoAtualizado) {
      return res.status(404).json({ msg: 'Medicamento não encontrado' });
    }
    res.json(medicamentoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar medicamento:', error);
    res.status(500).send('Erro no servidor ao atualizar medicamento');
  }
};

// Remover um medicamento existente
exports.removerMedicamento = async (req, res) => {
  try {
    const { id } = req.params;
    const medicamentoRemovido = await Medicamento.findByIdAndDelete(id);
    if (!medicamentoRemovido) {
      return res.status(404).json({ msg: 'Medicamento não encontrado' });
    }
    res.json({ msg: 'Medicamento removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover medicamento:', error);
    res.status(500).send('Erro no servidor ao remover medicamento');
  }
};
