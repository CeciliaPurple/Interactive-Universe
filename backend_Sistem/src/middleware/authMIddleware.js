const jwt = require('jsonwebtoken');
const config = require('../Config/Database');

const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1];

    if(!token){
        return res.status(401).json({error: 'token não fornecido'});
    }

    jwt.verify(token, config.JWT_SECRET, (err, user) =>{
        if (err){
            return res.status(403).json({error:'Token invalido ou expirado'})
        }

        req.user = user;
        next();
    });
}

module.exports = authMiddleware;