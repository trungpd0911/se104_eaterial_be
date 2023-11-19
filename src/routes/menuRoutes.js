const router = require('express').Router();
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middlewares/authMiddleware');

// CRUD menu
router.post('/', authMiddleware.verifyTokenAdmin, menuController.createMenu);
router.get('/', menuController.getAllMenus);
router.get('/:id', menuController.getMenuByID);
router.put('/:id', authMiddleware.verifyTokenAdmin, menuController.updateMenu);
router.delete('/:id', authMiddleware.verifyTokenAdmin, menuController.deleteMenu);

// get all dishes of one menu
router.get('/:id/dishes', menuController.getAllDishesByMenuID)

module.exports = router;