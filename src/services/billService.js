const db = require('../models/index')
const billModel = db.bill;
const userModel = db.user;
const dishModel = db.dish;
const billDishModel = db.billDish;
const { Sequelize } = require('sequelize');

const getAllBills = async () => {
    try {
        const bills = await billModel.findAll({
            include: [{
                model: userModel,
                require: true,
                attributes: [
                    'username'
                ],
            }]
        });
        return {
            status: 200,
            message: 'Get all bills successfully',
            data: bills
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
            data: null,
        }
    }
}

const getUsersUnpaidBill = async (userid) => {
    try {
        const bills = await billModel.findOne({
            where: {
                billPayed: false,
                userId: userid
            },
            include: [{
                model: userModel,
                require: true,
                attributes: [
                    'username'
                ],
            }]
        });
        return {
            status: 200,
            message: 'Get unpaid bill by userid successfully',
            data: bills
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
            data: null,
        }
    }
}

const getAllBillsByUserID = async (userid) => {
    try {
        const bills = await billModel.findAll({
            where: {
                userId: userid,
            },
            include: [{
                model: userModel,
                require: true,
                attributes: [
                    'username'
                ]
            }]
        });
        return {
            status: 200,
            message: 'Get all bill by userid successfully',
            data: bills
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
            data: null,
        }
    }
}

const getAllBillsByUserName = async (username) => {
    try {
        const bills = await billModel.findAll({
            include: [{
                model: userModel,
                require: true,
                attributes: [
                    'username'
                ],
                where: {
                    username: username
                }
            }]
        });
        return {
            status: 200,
            message: 'Get all bill by username successfully',
            data: bills
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
            data: null,
        }
    }
}


const filterBills = async (filter) => {
    try {
        let username = filter.username;
        let id = filter.id;
        let fromDay = filter.fromDay;
        let toDay = filter.toDay;
        let billPayed = filter.billPayed;

        let dbFilter = {
            where: {},
            include: [{
                model: userModel,
                require: true,
                attributes: [
                    'username'
                ],
                where: {}
            }]
        }
        if (username) {
            dbFilter.include[0].where['username'] = username;
            console.log(dbFilter.include[0].where['username'])
        }
        if (id) {
            dbFilter.where['id'] = id;
        }
        if (fromDay && toDay) {
            fromDay = new Date(fromDay);
            toDay = new Date(toDay);
            // Count down a day (because toDay is at 0h0m0s)
            toDay = new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate() + 1);


            dbFilter.where.createdAt = {
                [Sequelize.Op.gte]: fromDay,
                [Sequelize.Op.lte]: toDay,
            }
        }
        if (billPayed) {
            dbFilter.where.billPayed = billPayed;
        }

        const bills = await billModel.findAll(dbFilter);

        return {
            status: 200,
            message: "Successfully",
            data: bills,
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
            data: null,
        }
    }
}


const addDishToCart = async (addDishToCartReq) => {
    const userId = addDishToCartReq.userId;
    const dishId = addDishToCartReq.dishId;
    try {
        let unpaidBill = await billModel.findOne({
            where: {
                userId: userId,
                billPayed: false,
            }
        });
        
        let currBillDish;
        // If an unpaid bill existed, then find the dish in that bill
        if (unpaidBill) {
            currBillDish = await billDishModel.findOne({
                where: {
                    billId: unpaidBill.id,
                    dishId: dishId
                },
            })

            // If the dish existed in the bill, then increase the amount of dish by 1
            if (currBillDish) {
                currBillDish.dishAmount += 1;
                currBillDish.save();
            }
            // Else create a new dish in that bill 
            else {
                currBillDish = await billDishModel.create({
                    billId: unpaidBill.id,
                    dishId: dishId,
                    dishAmount: 1
                });
            }
        }
        // Else create a new unpaid bill of that user and add the dish 
        else {
            const newBill = await billModel.create({
                userId: userId,
                billDate: Date(),
                totalMoney: 0,
                billPayed: false
            })
            
            currBillDish = await billDishModel.create({
                billId: newBill.id,
                dishId: dishId,
                dishAmount: 1
            })
        }
        
        return {
            status: 200,
            message: "Add dish to bill successfully",
            data: currBillDish,
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
            data: null,
        }
    }
}

const removeDishFromCart = async (removeDishFromCartReq) => {
    const userId = removeDishFromCartReq.userId;
    const dishId = removeDishFromCartReq.dishId;
    try {
        let unpaidBill = await billModel.findOne({
            where: {
                userId: userId,
                billPayed: false
            }
        });

        if (!unpaidBill) {
            return {
                status: 400,
                message: "No dish found",
                data: null,
            }
        } else {
            let currBillDish = await billDishModel.findOne({
                where: {
                    billId: unpaidBill.id,
                    dishId: dishId
                },
            })

            if (currBillDish && currBillDish.dishAmount > 1) {
                currBillDish.dishAmount -= 1;
                currBillDish.save();
            } else {
                await billDishModel.destroy({
                    where: {
                        billId: unpaidBill.id,
                        dishId: dishId
                    },
                  });
            }
        }

        return {
            status: 200,
            message: "Remove dish from cart successfully",
            data: null,
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
            data: null,
        }
    }
}

const getAllDishesOfBill = async (userId, billId) => {
    try {
        const currBill = await billModel.findOne({
            where: {
                id: billId,
                userId: userId
            }
        });
    
        if (!currBill) {
            return {
                status: 400,
                message: "Wrong bill ID",
                data: null,
            }
        } else {
            const dishList = await dishModel.findAll({
                where: {},
                attributes: [
                    'id',
                    'dishName',
                    'dishPrice',
                    'dishDescription'
                ],
                include: [{
                    model: billModel,
                    attributes: ['id'],
                    through: {
                        attributes: ['billId', 'dishAmount']
                    },
                    where: {
                        userId: userId,
                        id: billId
                    }
                }]
            });

            return {
                status: 200,
                message: "Get all dishes of bill successfully",
                data: dishList,
            }
        }
    } catch(error) {
        return {
            status: 500,
            message: error.message,
            data: null,
        }
    }
}

const getDishesInCart = async (userId) => {
    try {
        const dishList = await dishModel.findAll({
            include: [{
                model: billModel,
                attributes: ['id', 'userId'],
                where: {
                    userId: userId,
                    billPayed: false
                }
            }]
        });

        return {
            status: 200,
            message: "Get all dishes in cart successfully",
            data: dishList,
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
            data: null,
        }
    }
}

const checkout = async (userId) => {
    try {
        let unpaidBill = await billModel.findOne({
            where: {
                userId: userId,
                billPayed: false
            }
        });

        unpaidBill.billPayed = true;
        unpaidBill.save();

        return {
            status: 200,
            message: "Check out successfully",
            data: dishList,
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
            data: null,
        }
    }
}

module.exports = {
    getAllBills,
    getUsersUnpaidBill,
    getAllBillsByUserID,
    getAllBillsByUserName,
    filterBills,
    addDishToCart,
    removeDishFromCart,
    getAllDishesOfBill,
    getDishesInCart,
    checkout
}