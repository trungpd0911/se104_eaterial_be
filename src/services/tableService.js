const db = require('../models/index');
const tableModel = db.table;

const createTable = async (createTableReq) => {
    try {
        createTableReq.tableStatus = 'Available';
        console.log(createTableReq);
        const newTable = await tableModel.create(createTableReq);
        return {
            status: 200,
            message: "Create table successfully",
            data: newTable
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}

const deleteTable = async () => {

}

const filterTables = async () => {

}

const getUserTable = async () => {

}

const getAllTables = async () => {
    try {
        const tables = await tableModel.findAll();
        return {
            status: 200,
            message: 'Get all tables successfully',
            data: tables
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}

module.exports = {
    createTable,
    deleteTable,
    filterTables,
    getUserTable,
    getAllTables
}