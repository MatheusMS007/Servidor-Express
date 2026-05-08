import { cursosArray } from "../models/modelCurso.js"
import path from 'path'

// função para criar um curso
export const criarCurso = (req, res) => {

        const cod = req.body.cod // pega o valor do corpo da requisição. o valor de cod
        const curso = req.body.curso // pega o valor do corpo da requisição. o valor de curso
        const ch = req.body.ch // pega o valor do corpo da requisição. o valor de ch
        const tipo = req.body.tipo // pega o valor do corpo da requisição. o valor de tipo
    
    
        const novoCurso = {cod: cod, curso: curso, ch: ch, tipo: tipo} // pega os valores e cria um novo objeto com eles
        cursosArray.push(novoCurso) // adiciona o novo curso ao array de cursos
    
    
        //const {curso, ch, tipo} = req.body // desestruturação do objeto para pegar os valores de curso, ch e tipo
        //console.log(`Curso: ${curso}, Carga Horária: ${ch}, Tipo: ${tipo}`) // mostra os dados no console
    
    
        //res.status(200).json({messagem: 'Curso cadastrado!', novoCurso})
        res.redirect('/cursos') // redireciona para a rota de cursos para mostrar os cursos cadastrados, incluindo o novo curso que foi adicionado ao array de cursos
    }


    // função para listar todos os cursos
export const listaCursos = (req, res) => {
    res.status(200).json(cursosArray) // mostra os cursos cadastrados em formato JSON
}


// função para buscar um curso específico
export const buscarCurso = (req, res) => {
    const cursoEnco = cursosArray.find(c => c.curso === req.params.curso) // procura o curso no array de cursos usando o nome do curso passado como parâmetro na URL
    if(!cursoEnco){
        return res.status(500).json({messagem: 'Curso não encontrado!!'}) // se o curso não for encontrado, mostra uma mensagem de erro
    }
}


// somente envia para a página cadastro
export const cadastrarCurso = (req, res) => { // pega uma requisição em get e vai para a página cadastro
    res.sendFile(path.resolve('./src/public/html/cadastro.html')) // mostra a página de cadastro
}

// função para atualizar um curso usando o código do curso como parâmetro na URL
export const atualizarCurso = (req, res) => {
    const cursoEnco = cursosArray.find(c => c.cod === req.params.cod) // procura o curso no array de cursos usando o nome do curso passado como parâmetro na URL
    if(!cursoEnco || !ch || !tipo) { 
        return res.status(400).json({messagem: 'Curso não encontrado!'})
    } // se o curso não for encontrado, mostra uma mensagem de erro

    cursoEnco.cod = cod
    cursoEnco.curso = curso
    cursoEnco.ch = ch
    cursoEnco.tipo = tipo

    const cursoAtual = {cod, curso, ch, tipo}

    res.status(200).json({messagem: 'Curso encontrado!', cursoAtual}) // mostra o curso encontrado em formato JSON

}


// função para deletar um curso
export const deletarCurso = (req, res) =>{
    const cursoEnco = cursosArray.findIndex(c => c.cod === req.params.cod) // procura o curso no array de cursos usando o nome do curso passado como parâmetro na URL
    if(cursoEnco === -1){
        return res.status(500).json({messagem: 'Curso não encontrado!!'}) // se o curso não for encontrado, mostra uma mensagem de erro
    }

    cursosArray.splice(cursoEnco, 1) // remove o curso do array de cursos usando o índice encontrado
    res.status(200).json({messagem: 'Curso deletado!', cursosArray}) // mostra uma mensagem de sucesso
}


// função para alterar um curso
export const alterarCurso =  (req, res) => {
    const cursoEnco = cursosArray.find(c => c.cod === req.params.cod) // procura o curso no array de cursos usando o nome do curso passado como parâmetro na URL
    if(!cursoEnco){
        return res.status(500).json({messagem: 'Curso não encontrado!!'}) // se o curso não for encontrado, mostra uma mensagem de erro
    }

    const {cod, curso, ch, tipo} = req.body // desestruturação do objeto para pegar os valores de curso, ch e tipo

    if(curso !== undefined || curso !== null || curso !== ''){
        cursoEnco.curso = curso
    }

    if(ch !== undefined || ch !== null || ch !== ''){
        cursoEnco.ch = Number(ch)
    }
    
    if(tipo !== undefined || tipo !== null || tipo !== ''){
        cursoEnco.tipo = tipo
    }

    // atualiza o curso encontrado com os novos valores, se eles forem diferentes de undefined, null ou string vazia
    const atualCurso = {
        cod: cursoEnco.cod,
        curso: cursoEnco.curso,
        ch: cursoEnco.ch,
        tipo: cursoEnco.tipo
    }
    res.status(200).json({messagem: 'Curso atualizado!', atualCurso}) // mostra o curso atualizado em formato JSON
}