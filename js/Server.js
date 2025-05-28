const sequelize = require('./Database/ModelConnection.js'); // importa a conexão com o banco de dados// 
const app = require('./app.js'); // importa o app configurado

const PORT = 4000;

// Testa conexão com o banco e só então inicia o servidor
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        return sequelize.sync(); // Sincroniza os modelos com o banco
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });