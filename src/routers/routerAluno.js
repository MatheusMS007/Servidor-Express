import express from 'express';
import { criarAluno, listaAlunos, buscarAluno, atualizarAluno, deletarAluno, alterarAluno } from '../controllers/controllersAluno.js';

const router = express.Router()

// função criarAluno para cadastrar um aluno
router.post('/alunos', criarAluno) 

// função listarAluno para listar os alunos
router.post('/alunos', listaAlunos)

// função buscarAluno para buscar alunos cadastrados
router.post('/alunos', buscarAluno)

// função atualizarAluno para atualizar alunos cadastrados
router.post('/alunos', atualizarAluno)

// função deletarAluno para deletar alunos cadastrados
router.post('/alunos', deletarAluno)

// função alterarAluno para alterar alunos cadastrados
router.post('/alunos', alterarAluno)


export default router