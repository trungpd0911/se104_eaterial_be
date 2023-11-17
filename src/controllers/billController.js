const billService = require('../services/billService');

// Admins get all bills (with username)
const getAllBills = async (req, res) => {
    const response = await billService.getAllBills();
    res.status(response.status).json(response);
}

// Users get a bill by ID
const getUsersUnpaidBill = async (req, res) => {
    const userid = req.params.id;
    const response = await billService.getUsersUnpaidBill(userid);
    res.status(response.status).json(response);
}

// Admin/Users get all bills by a user ID (with username)
const getAllBillsByUserID = async (req, res) => {
    const userid = req.params.id;
    const response = await billService.getAllBillsByUserID(userid);
    res.status(response.status).json(response);
}

// Admins get all bills by user name (with username)
const getAllBillsByUserName = async (req, res) => {
    const username = req.params.username;
    const response = await billService.getAllBillsByUserName(username);
    res.status(response.status).json(response);
}

// Admin filter all bills by id, username, from day to day, billPayed
const filterBills = async (req, res) => {
    const filter = req.query;
    const response = await billService.filterBills(filter);
    res.status(response.status).json(response);
}

// Users add a dish to unpaid bill
// 3 cases:
// - No unpaid bill found -> create
// - The unpaid bill does not have the dish -> create
// - The unpaid bill has the dish -> increase amount
const addDishToCart = async (req, res) => {
    let addDishToCartReq = req.body;
    addDishToCartReq.userId = req.user.id;
    const response = await billService.addDishToCart(addDishToCartReq);
    res.status(response.status).json(response);
}

// Users remove a dish from bill
// 3 cases:
// - No dish found -> error
// - Dish amount > 1 -> Decrease by 1
// - Dish amount <= 1 -> Remove dish from bill
const removeDishFromCart = async (req, res) => {
    let removeDishFromCartReq = req.body;
    removeDishFromCartReq.userId = req.user.id;
    const response = await billService.removeDishFromCart(removeDishFromCartReq);
    res.status(response.status).json(response);
}

// Users checkout unpaid bill
const checkout = async (req, res) => {
    const userId = req.params.id;
    const response = await billService.checkout(userId);
    res.status(response.status).json(response);
}

// Users/Admins get all dishes of a bill
const getAllDishesOfBill = async (req, res) => {
    const userId = req.params.id;
    const billId = req.params.billid;
    const response = await billService.getAllDishesOfBill(userId, billId);
    res.status(response.status).json(response);
}

// Get all dishes in cart (unpaid bill)
const getDishesInCart = async (req, res) => {
    const userId = req.user.id;
    // const userId = 5;
    const response = await billService.getDishesInCart(userId);
    res.status(response.status).json(response);
}


module.exports = {
    getUsersUnpaidBill,
    getAllBillsByUserID,
    getAllBills,
    getAllBillsByUserName,
    filterBills,
    addDishToCart,
    removeDishFromCart,
    checkout,
    getAllDishesOfBill,
    getDishesInCart
}