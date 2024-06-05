const express = require('express');
const { getAlunos, getAlunoById, createAluno, updateAluno, deleteAluno } = require('../controllers/alunoController');

const router = express.Router();

router.get('/', getAlunos);
router.get('/:id', getAlunoById);
router.post('/', createAluno);
router.put('/:id', updateAluno);
router.delete('/:id', deleteAluno);

module.exports = router;
