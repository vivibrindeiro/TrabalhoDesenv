const Aluno = require('../models/Aluno');

// Obter aluno por ID
exports.getAlunoById = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id).select('nome curso turno matricula');
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obter todos os alunos
exports.getAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find().select('nome curso turno matricula');
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Criar um novo aluno
exports.createAluno = async (req, res) => {
  const { nome, curso, turno } = req.body;
  const newMatricula = await getNextMatriculationNumber();

  const newAluno = new Aluno({ nome, curso, turno, matricula: newMatricula });

  try {
    const savedAluno = await newAluno.save();
    res.status(201).json({ message: 'Aluno criado com sucesso', savedAluno });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Atualizar um aluno
exports.updateAluno = async (req, res) => {
  const { nome, curso, turno, matricula } = req.body;

  try {
    const updatedAluno = await Aluno.findByIdAndUpdate(req.params.id, { nome, curso, turno, matricula }, { new: true });
    if (!updatedAluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json({ message: 'Aluno atualizado com sucesso', updatedAluno });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Excluir um aluno
exports.deleteAluno = async (req, res) => {
  try {
    const deletedAluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!deletedAluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json({ message: 'Aluno excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function getNextMatriculationNumber() {
  const latestStudent = await Aluno.findOne().sort({ _id: -1 });
  let lastMatricula = latestStudent ? latestStudent.matricula : '';
  lastMatricula = lastMatricula.replace(/[^0-9]/g, '');
  const lastMatriculaNumber = parseInt(lastMatricula) || 0;
  const nextMatriculaNumber = lastMatriculaNumber + 1;
  const formattedMatricula = nextMatriculaNumber.toString().padStart(5, '0');
  return formattedMatricula;
}
