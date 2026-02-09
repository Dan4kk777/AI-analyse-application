const express = require('express');
const router = express.Router();
const {db} = require('../db/index');

// Route to display the list of employees
router.get('/', async (req, res) => {
    try {
        const employees = await db.getEmployees(); // You'll implement this method in your DB class
        res.render('admin', { employees });
    } catch (error) {
        console.error('Ошибка получения списка сотрудников:', error);
        res.status(500).send('Ошибка сервера');
    }
});


// Route to delete an employee
router.post('/delete', async (req, res) => {
    const employeeId = req.query.employeeId;
    try {
        await db.deleteEmployee(employeeId); // Implement this method in your DB class
        res.redirect('/admin'); // Redirect to admin page
    } catch (error) {
        console.error('Ошибка удаления сотрудника:', error);
        res.status(500).send('Ошибка сервера');
    }
});

// Route to edit an employee (GET)
router.get('/edit', async (req, res) => {
    const employeeId = req.query.employeeId;
    try {
        const positions = await db.getPositions();
        const departments = await db.getDepartments();
        const employee = await db.getEmployeeById(employeeId); // Implement in DB class
        res.render('edit_employee', { employee, positions, departments});
    } catch (error) {
        console.error('Ошибка получения информации о сотруднике:', error);
        res.status(500).send('Ошибка сервера');
    }
});

// Route to update employee information (POST)
router.post('/edit', async (req, res) => {
    const employeeId = req.query.employeeId;
    //добавить пол
    const { name, position_id, gender, department_id, phone_number, email, comment } = req.body;
    try {
        await db.updateEmployee(employeeId, { name, position_id, gender, department_id, phone_number, email, comment }); // Implement in DB class
        res.redirect('/admin'); // Redirect to admin page
    } catch (error) {
        console.error('Ошибка обновления информации о сотруднике:', error);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;