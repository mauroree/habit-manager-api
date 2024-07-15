const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitoSchema = new Schema({
  nome: { type: String, required: true },
  observacao: { type: String },
  vezesAoDia: { type: Number, default: 1 }
});

module.exports = mongoose.model('Habito', habitoSchema);
