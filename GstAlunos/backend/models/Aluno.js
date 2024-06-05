const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  curso: { type: String, required: true },
  turno: { type: String, required: true },
  matricula: { type: String, unique: true, required: true }
});

module.exports = mongoose.model('Aluno', alunoSchema);
