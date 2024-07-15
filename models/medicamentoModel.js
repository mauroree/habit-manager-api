const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicamentoSchema = new Schema({
  nome: { type: String, required: true },
  horario: { type: String },
  vezesAoDia: { type: Number, default: 1 },
  habito: { type: Schema.Types.ObjectId, ref: 'Habito' }
});

module.exports = mongoose.model('Medicamento', medicamentoSchema);
