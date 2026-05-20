import {Sequelize} from 'sequelize'; // sequelize é utilizado para conectar o banco de dados
                                    // p o orm é usado como ponte entre bando de dados e o backend, facilita a manipulação dos dados

//import dotenv from 'dotenv';
//dotenv.config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database/bd.sqlite'
});

// Função para testar a conexão com o banco de dados
const conexaoBD = async () => {
    try {
        await sequelize.authenticate()
        console.log('Conexão com o banco estabelecidada com sucesso!')
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error)
    }
}

conexaoBD()

// Sincronizar o banco de dados, ou seja, criar as tabelas a partir dos modelos definidos
export const sincronizarBD = async () => {
    try {
        await sequelize.sync({force: false}) // força a sincronização do banco de dados, se true, apaga os dados antigos e cria novos
        console.log('Banco de dados sincronizado com sucesso!')
    } catch (error) {
        console.error('Não foi possível sincronizar o banco de dados:', error)
    }
}

//sincronizarBD()

export default sequelize;