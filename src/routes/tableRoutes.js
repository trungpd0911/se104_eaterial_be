const router = require('express').Router();
const tableController = require('../controllers/tableController.js');
const authMiddleware = require('../middlewares/authMiddleware.js')

// Admin
router.post('/', authMiddleware.verifyTokenAdmin, tableController.createTable);
router.delete('/:id', authMiddleware.verifyTokenAdmin, tableController.deleteTable);
router.get('/filter', authMiddleware.verifyTokenAdmin, tableController.filterTables);

// User
router.get('/all', authMiddleware.verifyToken, tableController.getAllTables);
router.get('/user', authMiddleware.verifyToken, tableController.getUserTable);

module.exports = router;