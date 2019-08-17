const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    
    if (!token)
        return res.status(401).send('ACCESS DENIED. THIS COMPUTER IS GOING TO EXPLODE IN THE NEXT 2 SECONDS...');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send('Invalid token');
    }
}