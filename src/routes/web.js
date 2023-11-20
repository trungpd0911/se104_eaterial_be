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
const commentRoute = require('./commentRoutes');

let router = express.Router();

let initWebRoutes = (app) => {
    router.use('/auth', authRoute);
    // done1
    router.use('/user', userRoute);
    // done
    router.use('/menu', menuRoute);
    // done
    router.use('/dish', dishRoute);
    // done
    router.use('/comment', commentRoute);
    // done
    router.use('/employee', employeeRoute);

    router.use('/bill', billRoute);
    router.use('/discount', discountRoute);
    router.use('/table', tableRoute);
    router.use('/revenue', revenueRoute);

    router.get('/', (req, res) => {
        res.status(200).json({ 'message': 'Ping successfully!' });
    })

    return app.use("/v1/", router);
};

module.exports = initWebRoutes;