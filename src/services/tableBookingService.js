const db = require('../models/index');
const tableBookingModel = db.tableBooking;
const tableModel = db.table;


// Create a tableBooking and set the tableStatus to Occupied
const bookTable = async (userId, tableId, bookingTime) => {
    // Check if the table exists
    let table = await tableModel.findOne({
        where: {
            id: tableId
        }
    })
    if (!table) {
        return {
            toClient: {
                message: "Table not found"
            },
            broadcast: null
        }
    }

    // Check if the table was booked
    let tableBooking = await tableBookingModel.findOne({
        where: {
            tableId: tableId
        }
    });
    if (tableBooking) {
        return {
            toClient: {
                message: "Table is occupied"
            },
            broadcast: null
        }
    }

    // check if the user has booked a table
    let userTableBooking = await tableBookingModel.findOne({
        where: {
            userId: userId
        }
    });
    if (userTableBooking) {
        return {
            toClient: {
                message: "You have booked a table"
            },
            broadcast: null
        }
    }

    // if not, book the table
    if (!tableBooking) {
        let newTableBooking = await tableBookingModel.create({
            userId: userId,
            tableId: tableId,
            bookingTime: new Date(bookingTime)
        });
        console.log(new Date(bookingTime));


        // Set status of table to Occupied
        table.tableStatus = 'Occupied';
        table.save();

        return {
            toClient: {
                message: "Book table successfully",
                table_id: newTableBooking.tableId
            },
            broadcast: {
                message: "A table booked",
                table_id: newTableBooking.tableId
            }
        }
    }

    // Table was booked
    
}

// Remove a tableBooking and set tableStatus to Available
const cancelTable = async (userId, tableId) => {
    // Check if the table exists
    let table = await tableModel.findOne({
        where: {
            id: tableId
        }
    })
    if (!table) {
        return {
            toClient: {
                message: "Table not found"
            },
            broadcast: null
        }
    }

    // Check if the table was booked
    let tableBooking = await tableBookingModel.findOne({
        where: {
            tableId: tableId
        }
    });
    if (!tableBooking) {
        return {
            toClient: {
                message: "Table has not been booked yet"
            },
            broadcast: null
        }
    }

    // If the table was booked by another user
    if (tableBooking.userId != userId) {
        return {
            toClient: {
                message: "Someone booked this table"
            },
            broadcast: null
        }
    }

    // Set the status to Available
    table.tableStatus = 'Available';
    table.save();
    tableBookingModel.destroy({
        where: {
            tableId: tableId
        }
    })

    return {
        toClient: {
            message: "Cancle table booking successfully",
            table_id: table.id
        },
        broadcast: null
    }
}

module.exports = {
    bookTable,
    cancelTable
}