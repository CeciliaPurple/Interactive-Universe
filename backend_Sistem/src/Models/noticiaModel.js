const {dataTypes} = require('sequelize');
const sequelize = require('../Config/Database');

const Noticias = sequelize.define('Noticias',{
    idNOTICIAS:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        PrimaryKey: true
    },

    TITULO:{
        type:DataTypes.STRING(100),
        allowNull: false
    },

    SUBTITULO:{
        type:DataTypes.STRING(500),
        allowNull: false
    },
    
    DESCRICAO1:{
        type:DataTypes.STRING(500),
        allowNull: false
    },

    CONTEUDO:{
        type:DataTypes.TEXT,
        allowNull: false
    },

    FOTO_CAPA:{
        type:DataTypes.STRING(500),
        allowNull: true
    },

    AUTOR_ID:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    DATA_PUBLICACAO:{
        type:DataTypes.DATE,
        allowNull: false
    },
    TIPO:{
        type:DataTypes.ENUN('NEBULOSA','ECLIPSE'),
        allowNull: false
    }
},
{
        tableName:'Noticias',
        timestamps: true,
     
});

module.exports = Noticias;
