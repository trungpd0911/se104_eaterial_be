const router = require('express').Router();
const tableController = require('../controllers/tableController.js');
const authMiddleware = require('../middlewares/authMiddleware.js')

// Admin
router.post('/', authMiddleware.verifyTokenAdmin, tableController.createTable);
router.delete(':id', authMiddleware.verifyTokenAdmin, tableController.deleteTable);
router.get('/all/filter', authMiddleware.verifyTokenAdmin, tableController.filterTables);
router.get('/all', authMiddleware.verifyToken, tableController.getAllTables);

// User
router.get('/my-table', authMiddleware.verifyToken, tableController.getUserTable);

module.exports = router;