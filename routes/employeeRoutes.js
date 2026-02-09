const express = require('express');
const { saveEmployeeData } = require('../controllers/employeeController');
const {db} = require('../db/index');
const router = express.Router();

// Маршрут для отображения формы
router.get('/save_form', async (req, res) => {
    const positions = await db.getPositions();
    const departments = await db.getDepartments();
    res.render('add_employee', {
        success: false,
        error: null,
        positions,
        departments
    });
});

// Маршрут для сохранения данных через URL параметры
router.get('/save', (req, res) => {
    const employeeData = req.query;

    saveEmployeeData(employeeData, 
        () => res.status(200).json({ message: 'Данные успешно сохранены!' }),
        (errorMessage) => res.status(400).json({ error: errorMessage })
    );
});

// Маршрут для обработки формы
router.post('/save_form', async (req, res) => {
    const employeeData = req.body;

    const positions = await db.getPositions();
    const departments = await db.getDepartments();
    saveEmployeeData(employeeData, 
        () => res.render('add_employee', { success: true, error: null, positions, departments}),
        (errorMessage) => res.status(400).render('add_employee', { success: false, error: errorMessage, positions, departments })
    );
});

module.exports = router;