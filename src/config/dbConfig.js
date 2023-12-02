require('dotenv').config();

const dbConfig = {
    HOST: process.env.HOST || 'localhost',
    USER: process.env.USER || 'root',
    PASSWORD: process.env.PASSWORD || '',
    DB: process.env.DB || 'eaterial',
    dialect: process.env.dialect || 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = dbConfig;
