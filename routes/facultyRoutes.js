const express = require('express');
const router = express.Router();
const {db} = require('../db/index');

// Маршрут для отображения списка факультетов
router.get('/', async (req, res) => {
    try {
        const faculties = await db.getFaculties();
        res.render('faculties', { faculties });
    } catch (error) {
        console.error('Ошибка получения списка факультетов:', error);
        res.status(500).send('Ошибка сервера');
    }
});


// Маршрут для отображения списка курсов факультета через query
router.get('/courses', async (req, res) => {
    const facultyId = req.query.facultyId;
    try {
        const courses = await db.getCourses(facultyId);
        res.render('courses', { facultyId, courses });
    } catch (error) {
        console.error('Ошибка получения списка курсов:', error);
        res.status(500).send('Ошибка сервера');
    }
});

// Маршрут для отображения списка групп курса через query
router.get('/groups', async (req, res) => {
    const { facultyId, courseId } = req.query;
    try {
        const groups = await db.getGroups(courseId);
        res.render('groups', { facultyId, courseId, groups });
    } catch (error) {
        console.error('Ошибка получения списка групп:', error);
        res.status(500).send('Ошибка сервера');
    }
});

// Маршрут для отображения списка студентов группы через query
router.get('/students', async (req, res) => {
    const { facultyId, courseId, groupId } = req.query;
    try {
        const students = await db.getStudents(groupId);
        res.render('students', { facultyId, courseId, groupId, students });
    } catch (error) {
        console.error('Ошибка получения списка студентов:', error);
        res.status(500).send('Ошибка сервера');
    }
});

// Маршрут для отображения информации о студенте через query
router.get('/student-info', async (req, res) => {
    const { facultyId, courseId, groupId, studentId } = req.query;
    try {
        const student = await db.getStudentInfo(studentId);
        res.render('student_info', { student, facultyId, courseId, groupId });
    } catch (error) {
        console.error('Ошибка получения информации о студенте:', error);
        res.status(500).send('Ошибка сервера');
    }
});

// // Маршрут для отображения списка курсов факультета
// router.get('/:facultyId/courses', async (req, res) => {
//     const facultyId = req.params.facultyId;
//     try {
//         const courses = await db.getCourses(facultyId);
//         res.render('courses', { facultyId, courses });
//     } catch (error) {
//         console.error('Ошибка получения списка курсов:', error);
//         res.status(500).send('Ошибка сервера');
//     }
// });

// // Маршрут для отображения списка групп курса
// router.get('/:facultyId/courses/:courseId/groups', async (req, res) => {
//     const {facultyId, courseId} = req.params;
//     try {
//         const groups = await db.getGroups(courseId);
//         res.render('groups', { facultyId, courseId, groups });
//     } catch (error) {
//         console.error('Ошибка получения списка групп:', error);
//         res.status(500).send('Ошибка сервера');
//     }
// });

// // Маршрут для отображения списка студентов группы
// router.get('/:facultyId/courses/:courseId/groups/:groupId/students', async (req, res) => {
//     const {facultyId, courseId, groupId} = req.params;
//     try {
//         const students = await db.getStudents(groupId);
//         res.render('students', { facultyId, courseId, groupId, students });
//     } catch (error) {
//         console.error('Ошибка получения списка студентов:', error);
//         res.status(500).send('Ошибка сервера');
//     }
// });

// // Маршрут для отображения информации о студенте
// router.get('/:facultyId/courses/:courseId/groups/:groupId/students/:studentId', async (req, res) => {
//     const {facultyId, courseId, groupId, studentId} = req.params;
//     try {
//         const student = await db.getStudentInfo(studentId);
//         res.render('student_info', {student, facultyId, courseId, groupId});
//     } catch (error) {
//         console.error('Ошибка получения информации о студенте:', error);
//         res.status(500).send('Ошибка сервера');
//     }
// });



module.exports = router;