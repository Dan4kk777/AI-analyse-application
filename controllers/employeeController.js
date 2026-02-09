
const { db } = require('../db/index');

async function saveEmployeeData(employeeData, onSuccess, onError) {
    // console.log(employeeData);
    const { name, position_id, gender, department_id, phone_number, email, comment } = employeeData;

    // Проверка обязательных параметров
    if (!name || !position_id || !gender || !department_id || !phone_number || !email || !comment) {
        return onError('Пожалуйста, укажите все параметры.');
    }

    if (employeeData.cur_date) {
        const [month, day, year] = employeeData.cur_date.split('/');
        const formattedDate = `${year}-${month}-${day}`; // '2000-08-15'
        employeeData.cur_date = formattedDate;
    }

    try {
        await db.saveEmployee(employeeData);
        onSuccess();
    } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
        onError('Ошибка при сохранении данных.');
    }
}

module.exports = { saveEmployeeData };