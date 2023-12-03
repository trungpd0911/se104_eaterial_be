const router = require('express').Router();

const discountController = require('../controllers/discountController');
const authMiddleware = require('../middlewares/authMiddleware');

// Admins get all discounts
router.get('/', authMiddleware.verifyTokenAdmin, discountController.getAllDiscounts);

// Admins create a discount
router.post('/', authMiddleware.verifyTokenAdmin, discountController.createDiscount);

// Admins delete a discount
router.delete('/:id', authMiddleware.verifyTokenAdmin, discountController.deleteDiscount);

// Admin assign a discount to a all users
router.post('/assign/:id', authMiddleware.verifyTokenAdmin, discountController.assignDiscountToAllUsers);

// Admin assign all discount to all users
router.post('/assignAll', discountController.assignAllDiscountToAllUsers);


// User get all their discounts
router.get('/user', authMiddleware.verifyToken, discountController.getAllUserDiscounts);

module.exports = router;
