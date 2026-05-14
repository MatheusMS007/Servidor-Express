import fs from 'fs'
import path from 'path'


//export const  cursosArray = [{
    //cod: '001',
    //curso: 'Desenv. sist.',
    //ch: '1200',
    //tipo:'Técnico'}
//]

const caminho = path.join(import.meta.dirname, '..', 'database', 'cursos.json')

// função para ler os cursos do arquivo JSON
export function lerCursos() {
    try {
        if(!fs.existsSync(caminho)) {
            fs.writeFileSync(caminho, '[]', 'utf-8')
        }   
        const conteudo = fs.readFileSync(caminho, 'utf-8')
        if(conteudo === '') {
            return []
        } else {
            return JSON.parse(conteudo)
        }
    } catch (error) {
        console.error('Erro ao ler o arquivo de cursos:', error)
        return []
    }
}

// função para salvar os cursos no arquivo JSON
export function salvarCursos(arrayCursos) {
    console.log('Salvando cursos no arquivo:', arrayCursos)
    try {
        fs.writeFileSync(caminho, JSON.stringify(arrayCursos, null, 2))
        console.log('Arquivo json salvo com sucesso!')

    } catch (error) {
        console.error('Erro ao salvar os cursos:', error)
    }
}
