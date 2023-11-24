const dbConfig = require('../config/dbConfig.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        logging: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log("Connect Db successfully");
    })
    .catch(err => {
        console.log("Error when connecting to db: ", + err);
    })

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.menu = require('./menuModel')(sequelize, DataTypes);
db.user = require('./userModel')(sequelize, DataTypes);
db.employee = require('./employeeModel')(sequelize, DataTypes);
db.discount = require('./discountModel')(sequelize, DataTypes);
db.dish = require('./dishModel')(sequelize, DataTypes);
db.bill = require('./billModel')(sequelize, DataTypes);
db.billDish = require('./billDishModel')(sequelize, DataTypes);
db.table = require('./tableModel')(sequelize, DataTypes);
db.tableBooking = require('./tableBookingModel')(sequelize, DataTypes);
db.comment = require('./commentModel')(sequelize, DataTypes);
db.image = require('./imageModel')(sequelize, DataTypes);
db.userDiscount = require('./userDiscountModel')(sequelize, DataTypes);

// setup for foreign keys

// user and employee
// db.user.hasMany(db.employee, {
//     foreignKey: 'userId',
//     foreignKeyConstraint: true,
// });
// db.employee.belongsTo(db.user, {
//     foreignKey: 'userId',
//     foreignKeyConstraint: true,
// });

// discount and user (user own discount)
db.user.belongsToMany(db.discount, {
    through: db.userDiscount,
    foreignKey: 'userId',
    otherKey: 'discountId'
});
db.discount.belongsToMany(db.user, {
    through: db.userDiscount,
    foreignKey: 'userId',
    otherKey: 'discountId'
});
// user and bill 
db.user.hasMany(db.bill, {
    foreignKey: 'userId',
    foreignKeyConstraint: true,
});
db.bill.belongsTo(db.user, {
    foreignKey: 'userId',
    foreignKeyConstraint: true,
});
// user and dish 1-n 1-n create comment
// Define the many-to-many relationship
db.user.belongsToMany(db.dish, {
    through: db.comment,
    foreignKey: 'customerId', // Use 'foreignKey' instead of 'key'
    otherKey: 'dishId',       // Specify the foreign key for the other model
});
db.dish.belongsToMany(db.user, {
    through: db.comment,
    foreignKey: 'dishId',
    otherKey: 'customerId',
});

// user and table create table booking 
db.user.belongsToMany(db.table, {
    through: db.tableBooking,
    foreignKey: 'userId',
    otherKey: 'tableId',
});
db.table.belongsToMany(db.user, {
    through: db.tableBooking,
    foreignKey: 'tableId',
    otherKey: 'userId',
});

// dish and bill create bill dish
db.bill.belongsToMany(db.dish, {
    through: db.billDish,
    foreignKey: 'billId',
    otherKey: 'dishId'
});
db.dish.belongsToMany(db.bill, {
    through: db.billDish,
    foreignKey: 'dishId',
    otherKey: 'billId'
})

// menu has many dish 
db.menu.hasMany(db.dish, {
    foreignKey: 'menuId',
    foreignKeyConstraint: true,
});
db.dish.belongsTo(db.menu, {
    foreignKey: 'menuId',
    foreignKeyConstraint: true,
});

// bill has one discount, discount belongs to many bill
db.bill.belongsTo(db.discount, {
    foreignKey: 'discountId',
    foreignKeyConstraint: true,
});
db.discount.hasMany(db.bill, {
    foreignKey: 'discountId',
    foreignKeyConstraint: true,
});

// dish has many image
db.dish.hasMany(db.image, {
    foreignKey: 'dishId',
    foreignKeyConstraint: true,
});
db.image.belongsTo(db.dish, {
    foreignKey: 'dishId',
    foreignKeyConstraint: true,
});



// If 'force' is set = true, data will be deleted when starting server
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Sequelize sync done");
    })

module.exports = db;