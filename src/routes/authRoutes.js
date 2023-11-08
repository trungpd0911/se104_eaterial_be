const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/refresh_token', authController.refreshToken);
router.post('/forgot_password', authController.forgotPassword);


module.exports = router;