const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Database');
const Usuario = require('./Usuario');
const Noticia = require('../Models/noticiaModel');

const Comentario = sequelize.define('Comentario', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  TEXTO: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  USUARIO_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'ID'
    }
  },
  NOTICIAS_idNOTICIAS: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Noticia,
      key: 'idNOTICIAS'
    }
  },
  DATA_POST: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'COMENTARIO',
  freezeTableName: true,
  timestamps: false
});

Comentario.belongsTo(Usuario, { foreignKey: 'USUARIO_ID'});
Comentario.belongsTo(Noticia, { foreignKey: 'NOTICIAS_idNOTICIAS' });

module.exports = Comentario;
