const tableService = require('../services/tableService');

const createTable = async (req, res) => {
    let createTableReq = req.body;
    console.log(createTableReq)
    const response = await tableService.createTable(createTableReq);
    res.status(response.status).json(response);
}

const deleteTable = async (req, res) => {
    let tableId = req.params.id;
    const response = await tableService.deleteTable(tableId);
    res.status(response.status).json(response);
}

const filterTables = async (req, res) => {

}

const getUserTable = async (req, res) => {
    let tableId = req.user.id;
    const response = await tableService.getUserTable(tableId);
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