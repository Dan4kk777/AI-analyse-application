

async function initPostgreDatabase(dbInstance) {

    try {
        //таблица сотрудников
        // await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS employees(
        //     id SERIAL PRIMARY KEY,
        //     name VARCHAR(255) NOT NULL,
        //     position VARCHAR(255) NOT NULL,
        //     gender CHAR(1) DEFAULT 'W',
        //     department VARCHAR(255) NOT NULL,
        //     phone_number VARCHAR(20) UNIQUE NOT NULL,
        //     cur_date DATE DEFAULT CURRENT_DATE,
        //     email VARCHAR(255) NOT NULL,
        //     comment TEXT NOT NULL
        // );`);
        // console.log('PostgreSQL: Таблица employees существует.');

        //Таблица должностей
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS positions (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE
        );`)
        console.log('PostgreSQL: Таблица positions существует.');

        //Таблица отделов
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS departments (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE
        );`)
        console.log('PostgreSQL: Таблица departments существует.');

        //таблица сотрудников
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS employees (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            position_id INTEGER REFERENCES positions(id),
            gender CHAR(1) DEFAULT 'W',
            department_id INTEGER REFERENCES departments(id),
            phone_number VARCHAR(20) UNIQUE NOT NULL,
            cur_date DATE DEFAULT CURRENT_DATE,
            email VARCHAR(255) NOT NULL,
            comment TEXT NOT NULL
        );`)
        console.log('PostgreSQL: Таблица employees существует.');


        //Таблица факультетов
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS faculties (
            faculty_id SERIAL PRIMARY KEY,
            faculty_name VARCHAR(255) NOT NULL
        );`);
        console.log('PostgreSQL: Таблица faculties существует.');

        //Таблица курсов
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS courses (
            course_id SERIAL PRIMARY KEY,
            course_name VARCHAR(255) NOT NULL,
            faculty_id INT REFERENCES faculties(faculty_id) ON DELETE CASCADE
        );`);
        console.log('PostgreSQL: Таблица courses существует.');

        //Таблица групп
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS groups (
            group_id SERIAL PRIMARY KEY,
            group_name VARCHAR(255) NOT NULL,
            course_id INT REFERENCES courses(course_id) ON DELETE CASCADE
        );`);
        console.log('PostgreSQL: Таблица groups существует.');

        //Таблица студентов
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS students (
            student_id SERIAL PRIMARY KEY,
            student_name VARCHAR(255) NOT NULL,
            group_id INT REFERENCES groups(group_id) ON DELETE CASCADE
        );`);
        console.log('PostgreSQL: Таблица students существует.');

        //Информация о студентах
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS student_info (
            info_id SERIAL PRIMARY KEY,
            student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
            edu_form VARCHAR(10) NOT NULL,
            average_score FLOAT NOT NULL,
            phone_number VARCHAR(20) UNIQUE NOT NULL
        );`)
        console.log('PostgreSQL: Таблица student_info существует.');

    } catch (error) {
        console.error('PostgreSQL: Ошибка при инициализации базы данных:', error);
    }

}



async function initMysqlDatabase(dbInstance) {

    //const mysqlConnection = await connectMySQL();

    try {
        //таблица сотрудников
        // await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS employees (
        //     id INT AUTO_INCREMENT PRIMARY KEY,
        //     name VARCHAR(255) NOT NULL,
        //     position VARCHAR(255) NOT NULL,
        //     gender CHAR(1) DEFAULT 'W',
        //     department VARCHAR(255) NOT NULL,
        //     phone_number VARCHAR(20) UNIQUE NOT NULL,
        //     cur_date DATE DEFAULT (CURRENT_DATE),
        //     email VARCHAR(255) NOT NULL,
        //     comment TEXT NOT NULL
        // );`)
        // console.log('MySQL: Таблица employees существует.');


        //Таблица должностей
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS positions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE
        );`)
        console.log('MySQL: Таблица positions существует.');

        //Таблица отделов
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS departments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE
        );`)
        console.log('MySQL: Таблица departments существует.');


        //таблица сотрудников
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS employees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            position_id INT,
            gender CHAR(1) DEFAULT 'W',
            department_id INT,
            phone_number VARCHAR(20) UNIQUE NOT NULL,
            cur_date DATE DEFAULT (CURRENT_DATE),
            email VARCHAR(255) NOT NULL,
            comment TEXT NOT NULL,
            FOREIGN KEY (position_id) REFERENCES positions(id) ON DELETE CASCADE,
            FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
        );`)
        console.log('MySQL: Таблица employees существует.');


        //Таблица факультетов
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS faculties (
            faculty_id INT AUTO_INCREMENT PRIMARY KEY,
            faculty_name VARCHAR(255) NOT NULL
        );`);
        console.log('MySQL: Таблица faculties существует.');


        // Таблица курсов
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS courses (
            course_id INT AUTO_INCREMENT PRIMARY KEY,
            course_name VARCHAR(255) NOT NULL,
            faculty_id INT,
            FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id) ON DELETE CASCADE
        );`);
        console.log('MySQL: Таблица courses существует.');


        // Таблица групп
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS \`groups\` (
            group_id INT AUTO_INCREMENT PRIMARY KEY,
            group_name VARCHAR(255) NOT NULL,
            course_id INT,
            FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
        );`);
        console.log('MySQL: Таблица groups существует.');


        // Таблица студентов
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS students (
            student_id INT AUTO_INCREMENT PRIMARY KEY,
            student_name VARCHAR(255) NOT NULL,
            group_id INT,
            FOREIGN KEY (group_id) REFERENCES \`groups\`(group_id) ON DELETE CASCADE
        );`);
        console.log('MySQL: Таблица students существует.');


        // Информация о студентах
        await dbInstance.client.query(`CREATE TABLE IF NOT EXISTS student_info (
            info_id INT AUTO_INCREMENT PRIMARY KEY,
            student_id INT,
            edu_form VARCHAR(10) NOT NULL,
            average_score FLOAT NOT NULL,
            phone_number VARCHAR(20) UNIQUE NOT NULL,
            FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
        );`);
        console.log('MySQL: Таблица student_info существует.');



    } catch (error) {
        console.error('MySQL: Ошибка при инициализации базы данных:', error);
    }
}

module.exports = { initPostgreDatabase, initMysqlDatabase };