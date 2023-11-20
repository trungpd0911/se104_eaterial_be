const discountService = require('../services/discountService');

// Admins get all discounts
const getAllDiscounts = async (req, res) => {
    const response = await discountService.getAllDiscounts();
    res.status(response.status).json(response);
}

// Admins create a discount
const createDiscount = async (req, res) => {
    const discount = req.body;
    const response = await discountService.createDiscount(discount);
    res.status(response.status).json(response);
}

// Admins delete a discount
const deleteDiscount = async (req, res) => {
    const discountId = req.params.id;
    const response = await discountService.deleteDiscount(discountId);
    res.status(response.status).json(response);
}

// Admin assign a discount to a all users:
const assignDiscountToAllUsers = async (req, res) => {
    const discountId = req.params.id;
    const response = await discountService.assignDiscountToAllUsers(discountId);
    res.status(response.status).json(response);
}


// User get all their discounts
const getAllUserDiscounts = async (req, res) => {
    const userId = req.user.id;
    const response = await discountService.getAllUserDiscounts(userId);
    res.status(response.status).json(response);
}

module.exports = {
    getAllDiscounts,
    createDiscount,
    deleteDiscount,
    getAllUserDiscounts,
    assignDiscountToAllUsers
}