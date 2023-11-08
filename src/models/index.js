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
db.users = require('./userModel')(sequelize, DataTypes);
db.employees = require('./employeeModel')(sequelize, DataTypes);
db.dishType = require('./dishTypeModel')(sequelize, DataTypes);
db.dish = require('./dishModel')(sequelize, DataTypes);
db.menu = require('./menuModel')(sequelize, DataTypes);
db.discount = require('./discountModel')(sequelize, DataTypes);
db.table = require('./tableModel')(sequelize, DataTypes);
db.tableBooking = require('./tableBookingModel')(sequelize, DataTypes);
db.comment = require('./commentModel')(sequelize, DataTypes);
db.bill = require('./billModel')(sequelize, DataTypes);
db.billDish = require('./billDishModel')(sequelize, DataTypes);




// setup for foreign keys
// db.users.hasMany(db.posts, {
//     foreignKey: 'user_id',
//     foreignKeyConstraint: true,
// });

// If 'force' is set = true, data will be deleted when starting server
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Sequelize sync done");
    })

module.exports = db;