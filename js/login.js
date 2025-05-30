const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sua-senha',
    database: 'sistema_solar'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
});

// Endpoint de login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Consulta ao banco de dados
    const query = 'SELECT * FROM usuarios WHERE NOME = ? AND SENHA = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];
            res.json({
                success: true,
                token: 'seu-token-aqui', // Aqui você pode gerar um token real
                userType: user.tipo // Retorna o tipo de usuário ("admin" ou "user")
            });
        } else {
            res.json({
                success: false,
                message: 'Credenciais inválidas'
            });
        }
    });
});

// Inicia o servidor
app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});

