// Переключатель между PostgreSQL и MariaDB
global.usePostgres = false; // Установите true для PostgreSQL, false для MySQL
const PORT = process.env.PORT || 5000;


const express = require('express');
const routes = require('./routes');
const path = require('path');


//созданик сервера
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')))

// все маршруты
app.use(routes);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});