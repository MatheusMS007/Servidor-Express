import express from 'express';
import { criarAluno, listaAlunos, buscarAluno, atualizarAluno, deletarAluno, alterarAluno, cadastroAluno } from '../controllers/controllersAluno.js';

const routerAluno = express.Router()

// função criarAluno para cadastrar um aluno
routerAluno.post('/alunos', criarAluno) 

// função listarAluno para listar os alunos
routerAluno.get('/alunos', listaAlunos)

// função buscarAluno para buscar alunos cadastrados
routerAluno.get('/alunos', buscarAluno)

// função atualizarAluno para atualizar alunos cadastrados
routerAluno.put('/alunos', atualizarAluno)

// função deletarAluno para deletar alunos cadastrados
routerAluno.delete('/alunos', deletarAluno)

// função alterarAluno para alterar alunos cadastrados
routerAluno.patch('/alunos', alterarAluno)

routerAluno.get('/cadastroAluno', cadastroAluno)

export default routerAluno