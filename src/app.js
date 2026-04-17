const express = require('express');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const { loginLimiter } = require('./middleware/rateLimit');

const app = express();


app.use(express.json());


app.use('/auth/login', loginLimiter);


app.use('/auth', authRoutes);


app.get('/', (req, res) => {
    res.send('API автентифікації блог-платформи працює! ');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`

     Сервер запущено на http://localhost:${PORT}
     Система автентифікації активна

    `);
});