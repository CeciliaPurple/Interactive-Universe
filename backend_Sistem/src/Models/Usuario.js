const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Database');

const Usuario = sequelize.define('Usuario', {
    ID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    NOME: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
    },
    EMAIL: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true, // Evita e-mails duplicados
        validate: {
            isEmail: true,
        },
    },
    SENHA: {
        type: DataTypes.STRING(100), // maior para armazenar hash futuramente
        allowNull: false,
    },
    TIPO_USUARIO: {
        type: DataTypes.ENUM('USUARIO', 'ADM'),
        allowNull: false,
        defaultValue: 'USUARIO', // sempre define um padrão
    },
},
{
    tableName: 'usuario',
    timestamps: false,
});

module.exports = Usuario;
