const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { validateUser } = require('../utils/validation');
const router = express.Router();


router.post('/register', async (req, res) => {
    const { email, password, role, bio } = req.body;
    

    const error = validateUser(email, password, role);
    if (error) return res.status(400).json({ message: error });

    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await pool.query(
            'INSERT INTO users (email, password, role, bio) VALUES ($1, $2, $3, $4) RETURNING id, email, role',
            [email, hashedPassword, role || 'reader', bio]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Користувач із таким email вже існує" });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Невірний email або пароль" });
        }


        const accessToken = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_ACCESS_SECRET, 
            { expiresIn: '15m' }
        );
        
        const refreshToken = jwt.sign(
            { id: user.id }, 
            process.env.JWT_REFRESH_SECRET, 
            { expiresIn: '7d' }
        );


        await pool.query(
            'INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES ($1, $2, NOW() + interval \'7 days\')', 
            [refreshToken, user.id]
        );

        res.json({ accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ message: "Помилка сервера при вході" });
    }
});

module.exports = router;