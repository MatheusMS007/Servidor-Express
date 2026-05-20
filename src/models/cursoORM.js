import { DataTypes } from "sequelize";
import sequelize from "../config/orm.js";

// define o modelo do curso, ou seja, a estrutura da tabela do curso no banco de dados
const Cursos = sequelize.define('Curso', {
    idCurso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    cod: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    curso: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 100
        }
    },

    ch: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
},

    {
        tableName: 'cursos',
        timestamps: false,
        charset: 'utf8',
    }

// define (nome, atributos, opções)
// define é uma função para definir tabelas no banco de dados
)

export default Cursos;