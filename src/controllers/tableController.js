const tableService = require('../services/tableService');

// Create a new table
const createTable = async (req, res) => {
    let createTableReq = req.body;
    console.log(createTableReq)
    const response = await tableService.createTable(createTableReq);
    res.status(response.status).json(response);
}

// Delete a table
const deleteTable = async (req, res) => {
    let tableId = req.params.id;
    const response = await tableService.deleteTable(tableId);
    res.status(response.status).json(response);
}

// Filter tables by tableStatus, tablePosition, bookingTime
const filterTables = async (req, res) => {
    const filter = req.query;
    console.log(filter);
    const tableStatus = filter.status;
    const tablePosition = filter.position;
    const bookingTime = filter.day;
    console.log("BookingTime: ", bookingTime);
    const response = await tableService.filterTables(tableStatus, tablePosition, bookingTime);
    res.status(response.status).json(response);
}

const getUserTable = async (req, res) => {
    let userId = req.user.id;
    const response = await tableService.getUserTable(userId);
    res.status(response.status).json(response);
}

const getAllTables = async (req, res) => {
    const response = await tableService.getAllTables();
    res.status(response.status).json(response);
}

module.exports = {
    createTable,
    deleteTable,
    filterTables,
    getUserTable,
    getAllTables
}