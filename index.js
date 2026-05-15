import express from 'express'
import routerCurso from './src/routers/routerCurso.js'
import routerAluno from './src/routers/routerAluno.js'
import path from 'path'
import morgan from 'morgan'
import dotenv from 'dotenv'


dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

// USE é uma função que serve para configurar o middleware do express
app.use(express.json()) // middleware para interpretar o corpo da requisição como JSON
app.use(express.urlencoded({extended: true})) // middleware para interpretar o corpo da requisição como URL-encoded

app.use(express.static(path.join(import.meta.dirname, 'src', 'public'))) // middleware para servir arquivos estáticos da pasta public
app.use(morgan('common')) // middleware para mostrar as requisições no console

app.set('view engine', 'ejs') // configura o template engine EJS para renderizar as páginas HTML
app.set('views', path.join(import.meta.dirname, 'src', 'views')) // configura a pasta views para renderizar as páginas HTML


app.use(routerCurso) // usa o routerCurso para configurar as rotas do curso

app.use(routerAluno) // usa o routerAluno para configurar as rotas do aluno

// rota para mostrar a página inicial
app.get('/', (req, res) => { // pega uma requisição em get
    //res.send('<h1> Página Inicial </h1>') 
    res.render('index') // mostra a página index usando o template engine EJS
})

// inicia o servidor
app.listen(PORT, HOST, () =>{ // pega a porta e o host e abre o servidor
    console.log(`Servidor em execução em http://${HOST}:${PORT}`)
})