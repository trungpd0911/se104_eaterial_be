const router = require('express').Router();

const revenueController = require('../controllers/revenueController');

router.get('/all', revenueController.getRevenueOfAllTime);

module.exports = router;