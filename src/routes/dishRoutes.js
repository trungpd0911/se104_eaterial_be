const router = require('express').Router();
const dishController = require('../controllers/dishController');

// get all dish 
router.get('/', dishController.getAllDishes);
// get dish by id
router.get('/:id', dishController.getDishByID);
// create dish
router.post('/', dishController.createDish);
// update dish
router.put('/:id', dishController.updateDish);
// delete dish
router.delete('/:id', dishController.deleteDish);
// get dish by menu 
router.get('/menu/:id', dishController.getDishByMenu);

module.exports = router;