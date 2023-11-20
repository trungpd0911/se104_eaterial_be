const employeeService = require('../services/employeeService')

const createEmployee = async (req, res) => {
    const response = await employeeService.createEmployee(req.body);
    res.status(response.statusCode).json(response);
}

const getAllEmployees = async (req, res) => {
    const response = await employeeService.getAllEmployees();
    res.status(response.statusCode).json(response);
}

const getEmployeeByID = async (req, res) => {
    const response = await employeeService.getEmployeeByID(req.params.id);
    res.status(response.statusCode).json(response);
}

const updateEmployee = async (req, res) => {
    const response = await employeeService.updateEmployee(req.params.id, req.body);
    res.status(response.statusCode).json(response);
}

const deleteEmployee = async (req, res) => {
    const response = await employeeService.deleteEmployee(req.params.id);
    res.status(response.statusCode).json(response);
}

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeByID,
    updateEmployee,
    deleteEmployee
}