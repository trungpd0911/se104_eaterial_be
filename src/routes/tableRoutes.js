const router = require('express').Router();
const tableController = require('../controllers/tableController.js');

// Admin
router.post('/', tableController.createTable);
router.delete(':id', tableController.deleteTable);
router.get('/all/filter', tableController.filterTables);
router.get('/all', tableController.getAllTables);

// User
router.get('/my-table', tableController.getUserTable);

module.exports = router;