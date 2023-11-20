const db = require('../models/index')
const Employee = db.employee;

const createEmployee = async (data) => {
    try {
        const { employeeName, employeePossition, staffCode, salary, startWorkingDay, phoneNumber } = data;
        const employee = await Employee.create({
            employeeName: employeeName,
            employeePossition: employeePossition,
            staffCode: staffCode,
            salary: salary,
            startWorkingDay: startWorkingDay,
            phoneNumber: phoneNumber,
            totalWorkingTime: 0,
        });
        return {
            statusCode: 200,
            message: 'Create employee successfully',
            data: null
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
            data: null
        }
    }
}

module.exports = {
    createEmployee,

}