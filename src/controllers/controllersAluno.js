import path from "path"
import { lerAlunos, salvarAlunos } from "../models/modelAluno.js"
import { v4 as uuidv4 } from 'uuid'

let alunosArray = lerAlunos() // lê os alunos do arquivo JSON e armazena em um array para manipular os dados dos alunos

export const criarAluno = (req, res) => {
    const matricula = req.body.matricula // pega o valor do corpo da requisição. o valor de matricula
    const nome = req.body.nome // pega o valor do corpo da requisição. o valor de nome
    const curso = req.body.curso // pega o valor do corpo da requisição. o valor de curso

    const novoAluno = {id: uuidv4(), matricula: matricula, nome: nome, curso: curso} // pega os valores e cria um novo objeto com eles
    alunosArray.push(novoAluno) // adiciona o novo aluno ao array de alunos
    salvarAlunos(alunosArray) // salva o array de alunos no arquivo JSON

    res.redirect('/alunos') // redireciona para a rota de alunos para mostrar os alunos cadastrados, incluindo o novo aluno que foi adicionado ao array de alunos
}

// listar os alunos cadastrados
export const listaAlunos = (req, res) => {
    res.render('alunos', {alunosArray}) // mostra os alunos cadastrados usando o template engine EJS

}

// função para buscar um aluno específico
export const buscarAluno = (req, res) => {
    const alunoEnco = alunosArray.find(a => a.matricula === req.params.matricula) // procura o aluno no array de alunos usando o nome do aluno passado como parâmetro na URL
    if(!alunoEnco) {
        return res.status(500).json({messagem: 'Aluno não encontrado!!'}) // se o aluno não for encontrado, mostra uma mensagem de erro
    }
}

// atualizar um aluno usando a matrícula do aluno como parâmetro na URL
export const atualizarAluno = (req, res) => {
    const { matricula, nome, curso } = req.body
    const alunoEnco = alunosArray.find(a => a.matricula === req.params.matricula)

    if (!alunoEnco || !matricula || !nome || !curso) {
        return res.status(400).json({ mensagem: 'Aluno não encontrado ou dados incompletos!' })
    }

    alunoEnco.matricula = matricula
    alunoEnco.nome = nome
    alunoEnco.curso = curso
    salvarAlunos(alunosArray)

    const alunoAtualizado = {matricula, nome, curso} // pega os valores e cria um novo objeto com eles

    res.status(200).json({messagem: 'Aluno atualizado com sucesso!', alunoAtualizado}) // mostra uma mensagem de sucesso e o aluno atualizado em formato JSON
}

// função para deletar um aluno usando a matrícula do aluno como parâmetro na URL
export const deletarAluno = (req, res) => {
    const alunoEnco = alunosArray.find(a => a.matricula === req.params.matricula) // procura o aluno no array e deleta os dados da matrícula
    if(!alunoEnco) {
        return res.status(400).json({messagem: 'Aluno não encontrado!'}) // se o aluno não for encontrado, mostra uma mensagem de erro
    }

    alunosArray.splice(alunoEnco, 1) // deleta o aluno do array de alunos usando o método splice
    res.status(200).json({messagem: 'Aluno deletado com sucesso!', alunosArray}) // mostra uma mensagem de sucesso
}

// função para atualizar todos os dados do aluno
export const alterarAluno = (req, res) => {
    const alunoEnco = alunosArray.find(a => a.matricula === req.params.matricula) // procura o aluno no array e atualiza os dados da matrícula
    if(!alunoEnco) {
        return res.status(500).json({messagem: 'Aluno não encontrado!'})
    }

    const {matricula, nome, curso} = req.body // desestruturação do objeto para pegar os valores de matrícula, nome e curso

    if (matricula !== undefined && matricula !== null && matricula !== '') {
        alunoEnco.matricula = matricula
    }
    if (nome !== undefined && nome !== null && nome !== '') {
        alunoEnco.nome = nome
    }
    if (curso !== undefined && curso !== null && curso !== '') {
        alunoEnco.curso = curso
    }

    const alunoAtualizado = {
        matricula: alunoEnco.matricula,
        nome: alunoEnco.nome,
        curso: alunoEnco.curso
    }

    res.status(200).json({messagem: 'Aluno atualizado com sucesso!', alunoAtualizado}) // mostra uma mensagem de sucesso e o aluno atualizado em formato JSON
}

// função para mostrar a página de cadastro de alunos
export const cadastroAluno = (req, res) => {
    res.sendFile(path.resolve('./src/public/html/cadastroAluno.html'))
}