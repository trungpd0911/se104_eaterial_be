const router = require('express').Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.verifyTokenAndAdmin, userController.getAllUsers);
router.get('/:id', userController.getUserByID);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
// forgot password
router.post('/forgot-password', userController.forgotPassword);
// change password
router.post('/change-password', userController.changePassword);

module.exports = router;