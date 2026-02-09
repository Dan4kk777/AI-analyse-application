const employeeRoutes = require('./employeeRoutes');
const facultyRoutes = require('./facultyRoutes');
const adminRoutes = require('./adminRoutes');

const express = require('express');
const router = express.Router();

router.use(employeeRoutes)

router.use('/faculties', facultyRoutes);
router.use('/admin', adminRoutes);


router.get('/', (req, res) => {
    res.render('index')
    // res.redirect('/faculties');
});

module.exports = router; 