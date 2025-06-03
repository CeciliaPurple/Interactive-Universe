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
    },
    SENHA: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    TIPO_USUARIO: {
        type: DataTypes.ENUM('USUARIO', 'ADM'),
        allowNull: true,
    },
}, 
{
    tableName: 'usuario',
    timestamps: false,
}
);

module.exports = Usuario;