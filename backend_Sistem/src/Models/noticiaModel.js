// src/models/noticia.js

const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Database'); // ajuste o caminho conforme seu projeto

const Noticia = sequelize.define('Noticia', {
  idNOTICIAS: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  TITULO: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  SUB_TITULO: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  DESCRICAO1: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  FOTO_CAPA: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  CONTEUDO: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ID_ADM: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'USUARIO',  // tabela de usuários/admins
      key: 'ID',
    },
  },
  DATA_PUBLICACAO: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'NOTICIAS',
  timestamps: false,
});

module.exports = Noticia;
