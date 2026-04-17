const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: { message: "Забагато спроб входу. Спробуйте через 15 хвилин." },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { loginLimiter };