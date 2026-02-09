//базовый абстрактный класс для работы с бд
const fs = require('fs');
const path = require('path');

class Database {
    constructor(config) {
        this.config = config;
        this.client = null;
    }

    async connect() {
        throw new Error('Метод connect() должен быть переопределён в подклассе');
    }

    async getPositions() {
        throw new Error('Метод getPositions() должен быть переопределён в подклассе');        
    }

    async getDepartments() {
        throw new Error('Метод getDepartments() должен быть переопределён в подклассе');        
    }

    async saveEmployee(employeeData) {
        throw new Error('Метод saveEmployee() должен быть переопределён в подклассе');
    }

    async getEmployeeById(employeeId) {
        throw new Error('Метод getEmployeeById() должен быть переопределён в подклассе');
    }

    async getEmployees() {
        throw new Error('Метод getEmployees() должен быть переопределён в подклассе');
    }

    async addEmployee(employeeData) {
        throw new Error('Метод addEmployee() должен быть переопределён в подклассе');
    }

    async updateEmployee(employeeId, employeeData) {
        throw new Error('Метод updateEmployee() должен быть переопределён в подклассе');
    }

    async deleteEmployee(employeeId) {
        throw new Error('Метод deleteEmployee() должен быть переопределён в подклассе');
    }

    async getDepartments() {
        throw new Error('Метод getDepartments() должен быть переопределён в подклассе');
    }

    async getFaculties() {
        throw new Error('Метод getFaculties() должен быть переопределён в подклассе');
    }

    async getCourses(facultyId) {
        throw new Error('Метод getCourses() должен быть переопределён в подклассе');
    }

    async getGroups(courseId) {
        throw new Error('Метод getGroups() должен быть переопределён в подклассе');
    }

    async getStudents(groupId) {
        throw new Error('Метод getStudents() должен быть переопределён в подклассе');
    }

    async getStudentInfo(studentId) {
        throw new Error('Метод getStudentInfo() должен быть переопределён в подклассе');
    }
}

module.exports = Database;