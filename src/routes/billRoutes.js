const router = require('express').Router();
const billController = require('../controllers/billController');
const authMiddleware = require('../middlewares/authMiddleware');

// admin
router.get("/all", authMiddleware.verifyTokenAdmin, billController.getAllBills);
router.get("/all/username/:username", authMiddleware.verifyTokenAdmin, billController.getAllBillsByUserName);
router.get("/all/filter", authMiddleware.verifyTokenAdmin, billController.filterBills);

// admin/owner user (:id is userId)
router.get("/unpaid/:id", authMiddleware.verifyTokenAdminOrCurrentUser, billController.getUsersUnpaidBill);
router.get("/all/userid/:id", authMiddleware.verifyTokenAdminOrCurrentUser, billController.getAllBillsByUserID);
router.get("/dish/:id/:billid", authMiddleware.verifyTokenAdminOrCurrentUser, billController.getAllDishesOfBill);
router.post("/checkout/:id", authMiddleware.verifyTokenAdminOrCurrentUser, billController.checkout);

// owner user
router.get("/cart", authMiddleware.verifyToken, billController.getDishesInCart);
router.post("/dish/add", authMiddleware.verifyToken, billController.addDishToCart);
router.post("/dish/remove", authMiddleware.verifyToken, billController.removeDishFromCart);

module.exports = router;