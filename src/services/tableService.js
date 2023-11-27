const db = require('../models/index');
const userModel = db.user;
const tableModel = db.table;
const { Sequelize } = require('sequelize');


const createTable = async (createTableReq) => {
    try {
        createTableReq.tableStatus = 'Available';
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

const filterTables = async (tableStatus, tablePosition, bookingTime) => {
    try {
        let filter = {
            include: [{
                model: userModel,
                through: {
                    attributes: ['userId', 'bookingTime'],
                    where: {}
                }
            }],
            where: {
                tableStatus: tableStatus
            }
        }

        if (tableStatus) {
            filter.where.tableStatus = tableStatus;
        }

        if (tablePosition) {
            filter.where.tablePosition = tablePosition;
        }

        if (bookingTime) {
            let toDay = new Date(bookingTime);
            toDay.setHours(23, 59, 59, 999);
            let fromDay = new Date(bookingTime);
            fromDay.setHours(0, 0, 0, 0);

            filter.include[0].through.where.bookingTime = {
                [Sequelize.Op.gte]: fromDay,
                [Sequelize.Op.lte]: toDay,
            };
        }

        const result = tableModel.findAll({
            where: {
                tableStatus: tableStatus
            }
        });

        return {
            status: 200,
            message: 'Filter tables successfully',
            data: result
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}

const getUserTable = async (userId) => {
    try {
        const bookedTable = await tableModel.findOne({
            attributes: [
                'id',
                'tablePosition',
                'tableStatus'
            ],
            include: [{
                model: userModel,
                attributes: ['id'],
                through: {
                    attributes: ['bookingTime']
                },
                where: {
                    id: userId
                }
            }]
        });
        return {
            status: 200,
            message: "Get booked table of user successfully",
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