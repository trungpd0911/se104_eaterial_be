const express = require('express');
const authRoute = require('./authRoutes');
const userRoute = require('./userRoutes');

let router = express.Router();

let initWebRoutes = (app) => {
    router.use('/auth', authRoute);
    router.use('/user', userRoute);

    return app.use("/v1/", router);
};

module.exports = initWebRoutes;