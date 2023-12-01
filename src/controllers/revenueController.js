const revenueService = require('../services/revenueService');

const getRevenueOfAllTime = async (req, res) => {
    try {
        const response = await revenueService.getRevenueOfAllTime();
        res.status(response.statusCode).json(response);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getRevenueOfAllTime
}