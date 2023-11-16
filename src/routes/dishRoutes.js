const router = require('express').Router();
const dishController = require('../controllers/dishController');
const authMiddleware = require('../middlewares/authMiddleware');
const { uploadCloudDish } = require('../middlewares/cloudinaryUploadMiddlewares');

// create dish
router.post('/', authMiddleware.verifyTokenAdmin, uploadCloudDish.array('images'), dishController.createDish);
// get all dish 
router.get('/', dishController.getAllDishes);
// get dish by id
router.get('/:id', dishController.getDishByID);
// update dish
router.put('/:id', authMiddleware.verifyTokenAdmin, uploadCloudDish.array('images'), dishController.updateDish);
// delete dish
router.delete('/:id', authMiddleware.verifyTokenAdmin, dishController.deleteDish);
// delete dish image 
router.delete('/images/:imageId', authMiddleware.verifyTokenAdmin, dishController.deleteDishImage);




// add comment  
router.post('/:id/comments', authMiddleware.verifyToken, dishController.addComment);
// get all comments
router.get('/:id/comments', dishController.getAllComments);
// get comment by id
router.get('/:id/comments/:commentId', dishController.getCommentByID);
// update comment
router.put('/:id/comments/:commentId', authMiddleware.verifyToken, dishController.updateComment);
// delete comment
router.delete('/:id/comments/:commentId', authMiddleware.verifyToken, dishController.deleteComment);


module.exports = router;