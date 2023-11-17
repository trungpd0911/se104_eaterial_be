const router = require('express').Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require("../middlewares/authMiddleware")

// create comment
router.post('/', authMiddleware.verifyToken, commentController.createComment);
// // get all comment
// router.get('/', commentController.getAllComments);
// // get comment by id
// router.get('/:id', commentController.getCommentByID);

module.exports = router;