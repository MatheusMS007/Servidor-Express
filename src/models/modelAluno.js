import fs from 'fs'
import path from 'path'

const caminhoAluno = path.join(import.meta.dirname, '..', 'database', 'alunos.json')

// função para ler os alunos do arquivo JSON
export function lerAlunos() {
    try{
        if(!fs.existsSync(caminhoAluno)) {
            fs.readFileSync(caminhoAluno,'[]', 'utf8')
        }
        const conteudoAluno = fs.readFileSync(caminhoAluno,'utf8')
        if(conteudoAluno === '') {
            return []
        } else {
            return JSON.parse(conteudoAluno)
        }
    } catch (error) {
        console.error('Erro ao ler alunos:', error)
        return []
    }
}

// função para salvar os alunos em JSON
export function salvarAlunos() {
    console.log('Salvando alunos em arquivos:', alunosArray)
    try {
        fs.writeFileSync(caminhoAluno, JSON.stringify(alunosArray, null, 2))
        console.log('Arquivo json foi salvo com sucesso!')
    }
    catch (error) {
        console.log('Erro ao salvar os alunos:', error)
    }
}