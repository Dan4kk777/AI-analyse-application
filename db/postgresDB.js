const { Client } = require('pg');
const Database = require('./db');
const {initPostgreDatabase} = require('./dbInit');

class PostgresDB extends Database {
    constructor(config) {
        super(config);
        this.client = new Client(this.config);
    }

    async connect() {
        await this.client.connect();
        console.log('Подключено к PostgreSQL');
        await initPostgreDatabase(this);
    }

    async saveEmployee(employeeData) {

        // const query = `
        // INSERT INTO employees (name, position, gender, department, phone_number, cur_date, email, comment)
        // VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        // const values = [employeeData.name, employeeData.position, employeeData.gender, employeeData.department, 
        //     employeeData.phone_number, employeeData.formattedDate, employeeData.email, employeeData.comment];


        let query = `
            INSERT INTO employees (name, position_id, gender, department_id, phone_number, email, comment
        `;
        let values = [employeeData.name, employeeData.position_id, employeeData.gender, 
            employeeData.department_id, employeeData.phone_number, employeeData.email, employeeData.comment];
        
        if (employeeData.cur_date) {
            // Если есть дата, добавляем поле и значение
            query += `, cur_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;`;
            values.push(employeeData.cur_date);
        } else {
            // Если даты нет, пропускаем поле cur_date
            query += `) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;
        }

        try {
            const queryResult = await this.client.query(query, values);
            //res.json(`Inserted employee with ID: ${queryResult.rows[0].id}`);
            console.log(`Inserted employee with ID: ${queryResult.rows[0].id}`);
        } catch (err) {
            // res.json(`Error inserting into PostgreSQL: ${err}`);
            console.log(`Error inserting into PostgreSQL: ${err}`);
        }

    }

    async getFaculties() {
        const result = await this.client.query('SELECT * FROM faculties');
        return result.rows;
    }

    async getCourses(facultyId) {
        const result = await this.client.query('SELECT * FROM courses WHERE faculty_id = $1', [facultyId]);
        return result.rows;
    }

    async getGroups(courseId) {
        const result = await this.client.query('SELECT * FROM groups WHERE course_id = $1', [courseId]);
        return result.rows;
    }

    async getStudents(groupId) {
        const result = await this.client.query('SELECT * FROM students WHERE group_id = $1', [groupId]);
        return result.rows;
    }

    async getStudentInfo(studentId) {
        const result = await this.client.query('SELECT * FROM student_info WHERE student_id = $1', [studentId]);
        return result.rows[0];
    }

    async getPositions() {
        const result = await this.client.query('SELECT * FROM positions');
        return result.rows;
    }

    async getDepartments() {
        const result = await this.client.query('SELECT * FROM departments');
        return result.rows;
    }

    // Реализация методов для работы с сотрудниками
    async getEmployees() {
        const result = await this.client.query('SELECT * FROM employees');
        return result.rows;
    }

    async getEmployeeById(employeeId) {
        const result = await this.client.query('SELECT * FROM employees WHERE id = $1', [employeeId]);
        return result.rows[0];
    }
   

    async updateEmployee(employeeId, employeeData) {
        const query = `UPDATE employees SET name = $1, position_id = $2, gender = $3, 
        department_id = $4, phone_number = $5, email = $6, comment = $7 WHERE id = $8`;
        const values = [employeeData.name, employeeData.position_id, employeeData.gender, 
            employeeData.department_id, employeeData.phone_number, employeeData.email,  employeeData.comment, employeeId];
        await this.client.query(query, values);
    }

    async deleteEmployee(employeeId) {
        await this.client.query('DELETE FROM employees WHERE id = $1', [employeeId]);
    }

}

module.exports = PostgresDB;
