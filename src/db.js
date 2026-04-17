const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});




const initDB = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(50) DEFAULT 'reader',
            bio TEXT,
            avatar_url TEXT
        );

        CREATE TABLE IF NOT EXISTS refresh_tokens (
            id SERIAL PRIMARY KEY,
            token TEXT NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            expires_at TIMESTAMP NOT NULL
        );
    `;
    try {
        await pool.query(query);
        console.log(" База даних PostgreSQL готова (таблиці перевірено)");
    } catch (err) {
        console.error(" Помилка ініціалізації БД:", err.message);
    }
};

initDB();

module.exports = pool;