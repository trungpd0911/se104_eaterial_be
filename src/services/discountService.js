const db = require("../models");
const userDiscountModel = db.userDiscount;
const discountModel = db.discount;
const userModel = db.user;

// Admins get all discounts
const getAllDiscounts = async () => {
    try {
        const discounts = await discountModel.findAll();
        return {
            status: 200,
            message: "Get all discounts successfully",
            data: discounts
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}

// Admins create a discount
const createDiscount = async (discount) => {
    try {
        const newDiscount = await discountModel.create(discount);
        return {
            status: 200,
            message: "Create discount successfully",
            data: newDiscount
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}

// Admins delete a discount
const deleteDiscount = async (discountId) => {
    try {
        await discountModel.destroy({
            where: {
                id: discountId
            }
        });
        return {
            status: 200,
            message: "Delete discount successfully",
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}

// Admin asign a discount to a all user:s:
const assignDiscountToAllUsers = async (discountId) => {
    try {
        // check if discount exist
        const discount = await discountModel.findOne({
            where: {
                id: discountId
            }
        });
        if (!discount) {
            return {
                status: 400,
                message: "Discount not found"
            }
        }


        // Set to all not-having users
        const users = await userModel.findAll();
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const userDiscount = await userDiscountModel.findOne({
                where: {
                    userId: user.id,
                    discountId: discountId
                }
            });
            if (!userDiscount) {
                await userDiscountModel.create({
                    userId: user.id,
                    discountId: discountId
                });
            }
        }

        return {
            status: 200,
            message: "Assign discount to all users successfully"
        }

    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }

}

// User get all their discounts
const getAllUserDiscounts = async (userId) => {
    try {
        // get all discount of user using userDiscount table
        // const discounts = await discountModel.findAll({
        //     include: [{
        //         through: {
        //             model: userDiscountModel,
        //             attributes: [],
        //             where: {
        //                 userId: userId
        //             }
        //         },
        //         model: userModel,
        //         attributes: ['id'],
        //         where: {
        //             id: userId
        //         }
        //     }]
        // });

        const discounts = await userModel.findAll({
            where: {
                id: userId
            },
            attributes: [],
            include: [{
                model: discountModel,
                through: {
                    model: userDiscountModel,
                    attributes: []
                }
            }]
        });

        return {
            status: 200,
            message: "Get all user discounts successfully",
            data: discounts
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}

module.exports = {
    getAllDiscounts,
    createDiscount,
    deleteDiscount,
    getAllUserDiscounts,
    assignDiscountToAllUsers
}
