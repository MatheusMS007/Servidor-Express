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
        const cursoEncontrado = await Cursos.findAll({where: {curso: {[op.like]: `%${nomeCurso}%`}}}) // findAll e op.like são usados para buscar e trazer vários resultados apartir de uma busca
        //select * from cursos where curso like '%nomeCurso%' // % significa que pode ter qualquer coisa antes ou depois do nome do curso/ isso é para sql
        res.status(200).json({mensagem: 'Curso Encontrado: ', cursoEncontrado})
    }catch(err){
        console.log(err)
        res.status(500).json({ mensagem: 'Curso não encontrado', erro: err.message})  
    }
}


export async function atualizarCurso(req, res) {
    try {
        const cursoAtualizado = await Cursos.update(req.body, {where: {cod: req.params.cod}})
        if(!cursoAtualizado) 
            return res.status(404).json({mensagem: 'Curso não encontrado!'})
        const cursoEncontrado = await Cursos.findOne({where: {cod: req.params.cod}})
        if()
    }
    
}



// export const atualizarCurso = async (req, res) => {
//     const {curso, ch, tipo} = req.body
//     const cod = req.params.cod
//     const dados = [curso, ch, tipo, cod]

//     try {
//         let update = `update cursos set curso = ?, ch = ?,tipo = ? where cod = ?`
            
//         await bdConexao.execute(update, dados)
        
//     } catch (error) {
//         console.log('Erro ao tentar atualizar o curso: ', error.message);
//     }
// }

export const removerCurso = async (req,res) => {
    const cod = req.params.cod
    try{
        let deleteCurso = `delete from cursos where cod = ?`
        await bdConexao.execute(deleteCurso, [cod])
    }
    catch(err){
        res.status (500).json({mensagem: 'nao encontrei seu curso, volte mais tarde',err})
    }

}

export const alterarCurso = (req, res) => {
    const cursoEncontrado = cursos.find(c => c.cod === req.params.cod)

    if(!cursoEncontrado){
      return res.status(400).json({mensagem: 'Curso não encontrado!'})
    }

    const {cod, curso, ch, tipo} = req.body

    if(curso !== undefined && curso !== null  && curso !== '') {
        cursoEncontrado.curso = curso
    }
    if ( ch !== undefined && ch !== null  && ch !== '' ){
            cursoEncontrado.ch = Number(ch)
    }
    if(tipo !== undefined && tipo !== null  && tipo !== ''){
        cursoEncontrado.tipo = tipo  
    }
    
    const cursoAtual = {
        cod: cod,  
        curso: cursoEncontrado.curso, 
        ch: cursoEncontrado.ch, 
        tipo: cursoEncontrado.tipo}

    res.status(200).json({mensagem: 'Curso Encontrado: ', cursoAtual})
}

export const cadastrarCurso = (req, res) => {
    res.sendFile(path.resolve('./src/public/html/cadastro.html'))
}
