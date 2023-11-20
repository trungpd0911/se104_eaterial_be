const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authMiddleware.verifyToken, authController.logout);
router.post('/refresh_token', authController.refreshToken);

module.exports = router;