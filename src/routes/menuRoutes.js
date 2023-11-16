const router = require('express').Router();
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', menuController.createMenu);
router.get('/', menuController.getAllMenus);
router.get('/:id', menuController.getMenuByID);
router.put('/:id', menuController.updateMenu);
router.delete('/:id', menuController.deleteMenu);
router.get('/:id/dishes', menuController.getAllDishesByMenuID)

module.exports = router;