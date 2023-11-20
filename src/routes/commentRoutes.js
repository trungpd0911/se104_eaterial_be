const router = require('express').Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require("../middlewares/authMiddleware")

// create comment
router.post('/', authMiddleware.verifyToken, commentController.createComment);

module.exports = router;