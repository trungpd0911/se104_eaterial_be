const express = require('express');
const authRoute = require('./authRoutes');
const userRoute = require('./userRoutes');
const dishRoute = require('./dishRoutes');
const discountRoute = require('./discountRoutes');
const billRoute = require('./billRoutes');
const tableRoute = require('./tableRoutes');
const employeeRoute = require('./employeeRoutes');
const menuRoute = require('./menuRoutes');
const revenueRoute = require('./revenueRoutes');

let router = express.Router();

let initWebRoutes = (app) => {
    router.use('/auth', authRoute);
    // done
    router.use('/user', userRoute);
    // done
    router.use('/dish', dishRoute);
    router.use('/menu', menuRoute);
    router.use('/employee', employeeRoute);

    router.use('/bill', billRoute);
    router.use('/discount', discountRoute);
    router.use('/table', tableRoute);
    router.use('/revenue', revenueRoute);

    return app.use("/v1/", router);
};

module.exports = initWebRoutes;