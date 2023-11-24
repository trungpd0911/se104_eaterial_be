const db = require('../models/index')
const Employee = db.employee;

const createEmployee = async (data) => {
    try {
        const { employeeName, employeePossition, staffCode, startWorkingDay, salary, workShift, phoneNumber } = data;
        if (!employeeName || !employeePossition || !staffCode || !startWorkingDay || !salary || !workShift || !phoneNumber) {
            return {
                statusCode: 422,
                message: 'Missing field',
                data: null
            }
        }
        const employee = Employee.findByPk(staffCode);
        if (employee) {
            return {
                statusCode: 400,
                message: 'Employee already exists',
                data: null
            }
        }
        await Employee.create({
            employeeName: employeeName,
            employeePossition: employeePossition,
            staffCode: staffCode,
            startWorkingDay: startWorkingDay,
            salary: salary,
            workShift: workShift,
            phoneNumber: phoneNumber
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

const getAllEmployees = async () => {
    try {
        const employees = await Employee.findAll();
        if (!employees) {
            return {
                statusCode: 404,
                message: 'Employees not found',
                data: null
            }
        }
        return {
            statusCode: 200,
            message: 'Get all employees successfully',
            data: employees
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
            data: null
        }
    }
};

const getEmployeeByID = async (id) => {
    try {
        const employee = await Employee.findOne({
            where: {
                id: id
            }
        });
        if (!employee) {
            return {
                statusCode: 404,
                message: 'Employee not found',
                data: null
            }
        }
        return {
            statusCode: 200,
            message: 'Get employee by id successfully',
            data: employee
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
            data: null
        }
    }
}

const updateEmployee = async (id, data) => {
    try {
        const employee = await Employee.findOne({
            where: {
                id: id
            }
        });
        if (!employee) {
            return {
                statusCode: 404,
                message: 'Employee not found',
                data: null
            }
        }
        const { employeeName, employeePossition, staffCode, startWorkingDay, salary, workShift, phoneNumber } = data;
        await Employee.update({
            employeeName: employeeName,
            employeePossition: employeePossition,
            staffCode: staffCode,
            startWorkingDay: startWorkingDay,
            salary: salary,
            workShift: workShift,
            phoneNumber: phoneNumber
        }, {
            where: {
                id: id
            }
        });
        return {
            statusCode: 200,
            message: 'Update employee successfully',
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

const deleteEmployee = async (id) => {
    try {
        const employee = await Employee.findOne({
            where: {
                id: id
            }
        });
        if (!employee) {
            return {
                statusCode: 404,
                message: 'Employee not found',
                data: null
            }
        }
        await Employee.destroy({
            where: {
                id: id
            }
        });
        return {
            statusCode: 200,
            message: 'Delete employee successfully',
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
    getAllEmployees,
    getEmployeeByID,
    updateEmployee,
    deleteEmployee
}