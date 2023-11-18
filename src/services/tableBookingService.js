let tables = [
    {
        "id": 1,
        "status": "Occupied"
    },
    {
        "id": 2,
        "status": "Available"
    },
    {
        "id": 3,
        "status": "Available"
    },
    {
        "id": 4,
        "status": "Available"
    },
    {
        "id": 5,
        "status": "Available"
    },
    {
        "id": 6,
        "status": "Available"
    },
    {
        "id": 7,
        "status": "Available"
    },
    {
        "id": 8,
        "status": "Available"
    },
    {
        "id": 9,
        "status": "Available"
    }
];

const db = require('../models/index');
const tableBookingModel = db.tableBooking;
const tableModel = db.table;

const bookTable = async (userId, tableId) => {
    // for (let table of tables) {
    //     if (table['id'] == tableId) {
    //         if (table['status'] === 'Available') {
    //             table['status'] = 'Occupied';
    //             return {
    //                 toClient: {
    //                     message: "Book table successfully",
    //                     table_id: tableId
    //                 },
    //                 broadcast: {
    //                     message: "A table is booked",
    //                     table_id: tableId
    //                 }
    //             }
    //         } else {
    //             return {
    //                 toClient: {
    //                     message: "Table is occupied"
    //                 },
    //                 broadcast: null
    //             }
    //         }
    //     }
    // }

    
    
    // console.log()
    let tables = await tableBookingModel.findAll({
        where: {
            userId: userId,
            tableId: tableId
        }
    });
    console.log(tables);

    return {
        toClient: {
            message: "Table not found"
        },
        broadcast: null
    }
}

const cancelTable = async () => {

}

module.exports = {
    // getAllTables,
    // filterTables,
    bookTable,
    cancelTable
}