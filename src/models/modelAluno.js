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
