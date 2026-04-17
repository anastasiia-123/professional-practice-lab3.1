const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) return res.status(401).json({ message: "Токен відсутній" });

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Токен недійсний або прострочений" });
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };