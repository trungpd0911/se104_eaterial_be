const express = require('express');
const authRoute = require('./authRoutes');

let router = express.Router();

let initWebRoutes = (app) => {
    router.use('/auth', authRoute);

    return app.use("/v1/", router);
};

module.exports = initWebRoutes;