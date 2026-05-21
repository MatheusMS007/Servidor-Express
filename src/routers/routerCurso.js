import express from 'express'
//import { criarCurso, cadastrarCurso, buscarCurso, atualizarCurso, deletarCurso, alterarCurso } from '../controllers/controllersCurso.ORM.js'
import { criarCurso, cadastrarCurso, listarCursos, buscarCurso } from '../controllers/controllersCursoORM.js'

const router = express.Router()

// rota para cadastrar um curso
router.post('/cursos', criarCurso) // pega uma requisição em post e chama a função criarCurso para cadastrar um curso

// rota para mostrar os cursos cadastrados
router.get('/cursos', listarCursos)

// rota para mostrar a página de cadastro***
router.get('/cadastro', cadastrarCurso)

// busca pelo cadastro do curso
router.get('/cursos/:curso', buscarCurso)

// rota para atualizar todos os parametros 
//router.put('/cursos/:cod',atualizarCurso)

// rota para deletar um curso usando o código do curso 
//router.delete('/cursos/:cod', deletarCurso )

// atualiza 1 ou mais dados do curso
//router.patch('/cursos/:cod', alterarCurso)

export default router





     