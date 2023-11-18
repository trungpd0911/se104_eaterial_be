const db = require('../models/index');
const userModel = require('../models/userModel');
const tableModel = db.table;
// const tableBookingModel = db.tableBooking

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

const deleteTable = async (tableId) => {
    try {
        await tableModel.destroy({
            where: {
                id: tableId
            }
        })
        return {
            status: 200,
            message: "Delete table successfully"
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}

const filterTables = async () => {

}

const getUserTable = async (userId) => {
    try {
        const bookedTable = await tableModel.findAll({
            attributes: [
                'id',
                'tablePosition',
                'tableStatus'
            ],
            include: [{
                model: userModel,
                through: {
                    attributes: ['bookingTime']
                },
                where: {
                    userId: userId
                }
            }]
        });
        return {
            status: 200,
            message: "Create table successfully",
            data: bookedTable
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
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