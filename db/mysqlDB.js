const mysql = require('mysql2/promise');
const Database = require('./db');
const { initMysqlDatabase } = require('./dbInit');

class MysqlDB extends Database {
    constructor(config) {
        super(config);
    }

    async connect() {
        this.client = await mysql.createConnection(this.config);
        console.log('Подключено к MysqlDB');
        await initMysqlDatabase(this);
    }

    async saveEmployee(employeeData) {
        // const query = `
        // INSERT INTO employees (name, position, gender, department, phone_number, cur_date, email, comment)
        // VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
        // const values = [employeeData.name, employeeData.position, employeeData.gender, employeeData.department, 
        //     employeeData.phone_number, employeeData.cur_date, employeeData.email, employeeData.comment];


        let query = `
            INSERT INTO employees (name, position_id, gender, department_id, phone_number, email, comment
        `;
        let values = [employeeData.name, employeeData.position_id, employeeData.gender,
        employeeData.department_id, employeeData.phone_number, employeeData.email, employeeData.comment];

        if (employeeData.cur_date) {
            // Если есть дата, добавляем поле и значение
            query += `, cur_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            values.push(employeeData.cur_date);
        } else {
            // Если даты нет, пропускаем поле cur_date
            query += `) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        }

        try {
            const [result] = await this.client.query(query, values);
            // res.json(`Inserted row with ID: ${result.insertId}`);
            console.log(`Inserted row with ID: ${result.insertId}`)
        } catch (err) {
            // res.json(`Error inserting into MySQL: ${err}`);
            console.log(`Error inserting into MySQL: ${err}`);
        }
    }

    async getFaculties() {
        const [rows] = await this.client.query('SELECT * FROM faculties');
        return rows;
    }

    async getCourses(facultyId) {
        const [rows] = await this.client.query('SELECT * FROM courses WHERE faculty_id = ?', [facultyId]);
        return rows;
    }

    async getGroups(courseId) {
        const [rows] = await this.client.query('SELECT * FROM `groups` WHERE course_id = ?', [courseId]);
        return rows;
    }

    async getStudents(groupId) {
        const [rows] = await this.client.query('SELECT * FROM students WHERE group_id = ?', [groupId]);
        return rows;
    }

    async getStudentInfo(studentId) {
        const [rows] = await this.client.query('SELECT * FROM student_info WHERE student_id = ?', [studentId]);
        return rows[0];
    }

    async getPositions() {
        const [rows] = await this.client.query('SELECT * FROM positions');
        return rows;
    }

    async getDepartments() {
        const [rows] = await this.client.query('SELECT * FROM departments');
        return rows;
    }

    // Реализация методов для работы с сотрудниками
    async getEmployees() {
        const [rows] = await this.client.query('SELECT * FROM employees');
        return rows;
    }

    async getEmployeeById(employeeId) {
        const [rows] = await this.client.query('SELECT * FROM employees WHERE id = ?', [employeeId]);
        return rows[0];
    }

    async updateEmployee(employeeId, employeeData) {
        const query = `UPDATE employees SET name = ?, position_id = ?, gender = ?,
         department_id = ?, phone_number = ?, email = ?, comment = ? WHERE id = ?`;
        const values = [employeeData.name, employeeData.position_id, employeeData.gender, employeeData.department_id,
        employeeData.phone_number, employeeData.email, employeeData.comment, employeeId];
        await this.client.query(query, values);
    }

    async deleteEmployee(employeeId) {
        await this.client.query('DELETE FROM employees WHERE id = ?', [employeeId]);
    }
}

module.exports = MysqlDB;