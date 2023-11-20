const router = require('express').Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { uploadCloudUser } = require('../middlewares/cloudinaryUploadMiddlewares');

router.get('/', authMiddleware.verifyTokenAdmin, userController.getAllUsers);
// admin or user(id = param.id) can get user by id
router.get('/:id', authMiddleware.verifyTokenAdminOrCurrentUser, userController.getUserByID);
// admin or user(id = param.id) can update user by id
router.put('/:id', authMiddleware.verifyTokenAdminOrCurrentUser, uploadCloudUser.single('image'), userController.updateUser);
// router.delete('/:id', userController.deleteUser);
// forgot password
router.post('/forgot-password', userController.forgotPassword);
// change password
router.post('/:id/change-password/', authMiddleware.verifyTokenAndAuthorization, userController.changePassword);

module.exports = router;