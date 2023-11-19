const employeeService = require('../services/employeeService')

const createEmployee = async (req, res) => {
    const response = await employeeService.createEmployee(req.body);
    res.status(response.statusCode).json(response);
}

module.exports = {
    createEmployee,
}