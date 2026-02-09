const PostgresDB = require('./postgresDB');
const MysqlDB = require('./mysqlDB');
const dotenv = require('dotenv');
dotenv.config();

// Настройки подключения к базам данных
const postgresConfig = {
    user: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.POSTGRES_DB_PORT,
    database: process.env.DB_NAME
};

const mysqldbConfig = {
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    database: process.env.DB_NAME
};

// Инициализация соединений
let db;

if (global.usePostgres) {
    db = new PostgresDB(postgresConfig);
} else {
    db = new MysqlDB(mysqldbConfig);
}

(async () => {
    try {
        await db.connect();
    } catch (err) {
        console.error('Ошибка:', err.message);
    }
})();

module.exports = { db }