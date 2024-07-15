// controllers/habitoController.js
const Habito = require('../models/habitoModel');

// Listar todos os hábitos
exports.listarHabitos = async (req, res) => {
  try {
    const habitos = await Habito.find();
    res.json(habitos);
  } catch (error) {
    console.error('Erro ao listar hábitos:', error);
    res.status(500).send('Erro no servidor ao buscar hábitos');
  }
};

// Criar um novo hábito
exports.criarHabito = async (req, res) => {
  try {
    const { nome, observacao, vezesAoDia } = req.body;
    const novoHabito = new Habito({ nome, observacao, vezesAoDia });
    const habitoSalvo = await novoHabito.save();
    res.status(201).json(habitoSalvo);
  } catch (error) {
    console.error('Erro ao criar hábito:', error);
    res.status(500).send('Erro no servidor ao criar hábito');
  }
};

// Atualizar um hábito existente
exports.atualizarHabito = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, observacao, vezesAoDia } = req.body;
    const habitoAtualizado = await Habito.findByIdAndUpdate(
      id,
      { nome, observacao, vezesAoDia },
      { new: true }
    );
    if (!habitoAtualizado) {
      return res.status(404).json({ msg: 'Hábito não encontrado' });
    }
    res.json(habitoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar hábito:', error);
    res.status(500).send('Erro no servidor ao atualizar hábito');
  }
};

// Remover um hábito existente
exports.removerHabito = async (req, res) => {
  try {
    const { id } = req.params;
    const habitoRemovido = await Habito.findByIdAndDelete(id);
    if (!habitoRemovido) {
      return res.status(404).json({ msg: 'Hábito não encontrado' });
    }
    res.json({ msg: 'Hábito removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover hábito:', error);
    res.status(500).send('Erro no servidor ao remover hábito');
  }
};
