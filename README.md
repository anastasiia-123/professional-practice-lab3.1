# Auth Service with JWT (Practical Work #3)

Система автентифікації для блог-платформи з ролями та захистом API.

## Технічний стек
- **Runtime:** Node.js
- **Database:** PostgreSQL
- **Auth:** JWT (Access + Refresh)
- **Security:** bcrypt, Express Rate Limit

## Як запустити
1. Створіть базу даних `blog_db` у PostgreSQL.
2. Налаштуйте файл `.env` (приклад у репозиторії).
3. Виконайте команди:
   ```bash
   npm install
   node src/app.js
   # Auth Service for Blog Platform (Practice #3)

Цей проект є системою автентифікації та авторизації для веб-платформи блогів. Реалізовано за допомогою Node.js, Express та PostgreSQL.

##  Функціональні можливості
- **Реєстрація користувачів:** з валідацією складних паролів та вибором ролі (author, reader).
- **Автентифікація (JWT):** використання пари Access Token (15 хв) та Refresh Token (7 днів).
- **Безпека:** - Хешування паролів за допомогою `bcrypt`.
  - Захист від Brute-force атак (Rate Limiting) на маршруті логіну.
  - Зберігання Refresh-токенів у базі даних для можливості їх відкликання (Logout).

##  Технологічний стек
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Security:** jsonwebtoken, bcryptjs, express-rate-limit
- **Environment:** dotenv

##  Початок роботи

### 1. Налаштування бази даних
Створіть базу даних у PostgreSQL (наприклад, через pgAdmin) з назвою `blog_db`.

### 2. Змінні оточення
Створіть файл `.env` у кореневій папці та додайте наступні параметри:
```env
PORT=3000
DATABASE_URL=postgres://postgres:1234@localhost:5432/blog_db
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
