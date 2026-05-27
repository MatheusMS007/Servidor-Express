import path from "path"
import Cursos from "../models/cursoORM.js"
import { Op } from "sequelize" // ´OP é um operador que serva para fazer buscas e traz os resultados e sugere o final da busca


export  const criarCurso = async(req, res) => {
    const {cod, curso, ch, tipo} = req.body // desestruturação da requisição    
    if(!cod || !curso || !ch || !tipo) {
        return res.status(400).json({mensagem: 'Preencha todos os dados!'})
    }
    try{
        const cursoNovo = await Cursos.create(req.body) // cria um novo curso usando o modelo do curso definido no ORM
        console.log(cursoNovo)
        res.redirect('/cursos')  
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})  
    }    
}

// função para listar os cursos usando o modelo do curso definido no ORM
export async function listarCursos (req, res) {
    try{
        const cursos = await Cursos.findAll() // findAll é o método usado para buscar todos os registros
        //res.status(200).json(cursos)
        res.render('cursos', {cursos})  // esse é usado para renderizar a página listarCursos usando o template engine EJS e passando os cursos como parâmetro
    }catch(err){
        console.log(err)
        res.status(500).json({ erro: err.message})  
    }
}

// função para buscar um curso usando o modelo do curso definido no ORM usando op.like
export const buscarCurso = async (req, res) => {
    const nomeCurso = req.params.curso
    try{
        const cursoEncontrado = await Cursos.findAll({where: {curso: {[Op.like]: `%${nomeCurso}%`}}}) // findAll e op.like são usados para buscar e trazer vários resultados apartir de uma busca
        //select * from cursos where curso like '%nomeCurso%' // % significa que pode ter qualquer coisa antes ou depois do nome do curso/ isso é para sql
        res.status(200).json({mensagem: 'Curso Encontrado: ', cursoEncontrado})
    }catch(err){
        console.log(err)
        res.status(500).json({ mensagem: 'Curso não encontrado', erro: err.message})  
    }
}

// função para atualizar o curso específico usando o 
export async function atualizarCurso(req, res) {
    const {curso, ch, tipo} = req.body

    if(!curso && !ch && !tipo) { // && é usado para verificar o PUT  que pede todos os parametros
        return res.status(400).json({mensagem: 'Preencha todos os dados!'})
    }
    try {
        const cursoEncontrado = await Cursos.findOne({where: {cod: req.params.cod}})
        if(!cursoEncontrado) {
            return res.status(404).json({mensagem: 'Curso não encontrado!'})
        }
        const cursoAtualizado = await Cursos.update(req.body, {where: {cod: req.params.cod}})
            res.status(200).json({mensagem: 'Curso atualizado com sucesso!', curso: cursoEncontrado})
    } catch (err) {
         console.log(err)
         res.status(500).json({ mensagem: 'Erro ao atualizar o curso', erro: err.message })
     }
}

// função para deletar o curso específico usando o modelo do curso definido no ORM
export const removerCurso = async (req, res) => {
    const cod = req.params.cod
    try {
        const cursoEncontrado = await Cursos.findOne({ where: { cod } })
        if (!cursoEncontrado) {
            return res.status(404).json({ mensagem: 'Curso não encontrado!' })
        }
        await Cursos.destroy({ where: { cod } })
        res.status(200).json({ mensagem: 'Curso deletado com sucesso!' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ mensagem: 'Erro ao deletar o curso', erro: err.message })
    }
}

// função para alterar o curso específico usando o modelo do curso definido no ORM
export const alterarCurso = async (req, res) => {
    const { curso, ch, tipo } = req.body

    if (!curso && !ch && !tipo) { // || é usado para verificar o PATCH que aceita atualizar apenas 1 campo
        return res.status(400).json({ mensagem: 'Informe ao menos um campo para alterar!' })
    }
    try {
        const cursoEncontrado = await Cursos.findOne({ where: { cod: req.params.cod } })
        if (!cursoEncontrado) {
            return res.status(404).json({ mensagem: 'Curso não encontrado!' })
        }
        await Cursos.update(req.body, { where: { cod: req.params.cod } })
        res.status(200).json({ mensagem: 'Curso alterado com sucesso!' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ mensagem: 'Erro ao alterar o curso', erro: err.message })
    }
}

export const cadastrarCurso = (req, res) => {
    res.sendFile(path.resolve('./src/public/html/cadastro.html'))
}

