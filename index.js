import express from 'express'
import routerCurso from './src/routers/routerCurso.js'


const app = express()
const PORT = 3000
const HOST = 'localhost'

// USE é uma função que serve para configurar o middleware do express
app.use(express.json()) // middleware para interpretar o corpo da requisição como JSON
app.use(express.urlencoded({extended: true})) // middleware para interpretar o corpo da requisição como URL-encoded

app.use(routerCurso) // usa o routerCurso para configurar as rotas do curso


// rota para mostrar a página inicial
app.get('/', (req, res) => { // pega uma requisição em get
    res.send('<h1> Página Inicial </h1>') 
})

// inicia o servidor
app.listen(PORT, HOST, () =>{ // pega a porta e o host e abre o servidor
    console.log(`Servidor em execução em http://${HOST}:${PORT}`)
})





     