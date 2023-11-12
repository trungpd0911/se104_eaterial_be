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
db.user = require('./userModel')(sequelize, DataTypes);
db.employee = require('./employeeModel')(sequelize, DataTypes);
db.dishType = require('./dishTypeModel')(sequelize, DataTypes);
db.dish = require('./dishModel')(sequelize, DataTypes);
db.menu = require('./menuModel')(sequelize, DataTypes);
db.discount = require('./discountModel')(sequelize, DataTypes);
db.table = require('./tableModel')(sequelize, DataTypes);
db.tableBooking = require('./tableBookingModel')(sequelize, DataTypes);
db.comment = require('./commentModel')(sequelize, DataTypes);
db.bill = require('./billModel')(sequelize, DataTypes);
db.billDish = require('./billDishModel')(sequelize, DataTypes);
db.image = require('./imageModel')(sequelize, DataTypes);

// setup for foreign keys

// user and employee
db.user.hasMany(db.employee, {
    foreignKey: 'user_id',
    foreignKeyConstraint: true,
});
db.employee.belongsTo(db.user, {
    foreignKey: 'user_id',
    foreignKeyConstraint: true,
});

// discount and user(admin)
db.user.hasMany(db.discount, {
    foreignKey: 'admin_id',
    foreignKeyConstraint: true,
});
db.discount.belongsTo(db.user, {
    foreignKey: 'admin_id',
    foreignKeyConstraint: true,
});
// user and bill 
db.user.hasMany(db.bill, {
    foreignKey: 'user_id',
    foreignKeyConstraint: true,
});
db.bill.belongsTo(db.user, {
    foreignKey: 'user_id',
    foreignKeyConstraint: true,
});
// user and dish 1-n 1-n create comment
// Define the many-to-many relationship
db.user.belongsToMany(db.dish, {
    through: db.comment,
    foreignKey: 'customer_id', // Use 'foreignKey' instead of 'key'
    otherKey: 'dish_id',       // Specify the foreign key for the other model
});

// If you want to define the inverse relationship, you can do the following
db.dish.belongsToMany(db.user, {
    through: db.comment,
    foreignKey: 'dish_id',
    otherKey: 'customer_id',
});

// user and table create table booking 
db.user.belongsToMany(db.table, {
    through: db.tableBooking,
    foreignKey: 'user_id',
    otherKey: 'table_id',
})
db.table.belongsToMany(db.user, {
    through: db.tableBooking,
    foreignKey: 'table_id',
    otherKey: 'user_id',
})

// dish and bill create bill dish
db.dish.belongsToMany(db.bill, {
    through: db.billDish,
    foreignKey: 'dish_id',
    otherKey: 'bill_id',
})
db.bill.belongsToMany(db.dish, {
    through: db.billDish,
    foreignKey: 'bill_id',
    otherKey: 'dish_id',
})

// menu has many dish 
db.menu.hasMany(db.dish, {
    foreignKey: 'menu_id',
    foreignKeyConstraint: true,
});
db.dish.belongsTo(db.menu, {
    foreignKey: 'menu_id',
    foreignKeyConstraint: true,
});

// dish and dish type
db.dishType.hasMany(db.dish, {
    foreignKey: 'dish_type_id',
    foreignKeyConstraint: true,
});
db.dish.belongsTo(db.dishType, {
    foreignKey: 'dish_type_id',
    foreignKeyConstraint: true,
});

// dish has many discount 
db.dish.hasMany(db.discount, {
    foreignKey: 'dish_id',
    foreignKeyConstraint: true,
});
db.discount.belongsTo(db.dish, {
    foreignKey: 'dish_id',
    foreignKeyConstraint: true,
});

// dish has many image
db.dish.hasMany(db.image, {
    foreignKey: 'dish_id',
    foreignKeyConstraint: true,
});
db.image.belongsTo(db.dish, {
    foreignKey: 'dish_id',
    foreignKeyConstraint: true,
});



// If 'force' is set = true, data will be deleted when starting server
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Sequelize sync done");
    })

module.exports = db;