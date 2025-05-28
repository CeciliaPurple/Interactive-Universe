const { Sequelize } = require('sequelize');

// Substitua pelos dados do seu banco
const sequelize = new Sequelize('nome_do_banco', 'usuario', 'senha', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Mostra menos logs no console
});

module.exports = sequelize;