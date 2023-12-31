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
// get all comment of one dish
router.get("/:id/comments", dishController.getAllCommentsOfDish);

// filter dish by price and menu name
router.get('/all/filter/', dishController.filterDishByPriceAndMenuName);

// search dish by name
router.get('/all/search', dishController.searchDishByName);

module.exports = router;