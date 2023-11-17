const db = require("../models/index")
const Comment = db.comment
const Dish = db.dish

const createComment = async (userId, data) => {
    try {
        const { rating, content, dishId } = data;
        if (!rating || !content || !dishId)
            return {
                statusCode: 400,
                message: "Rating and content are required",
                data: null,
            }
        // check if dishId is valid
        const checkDish = await Dish.findByPk(dishId);
        if (!checkDish)
            return {
                statusCode: 400,
                message: "Dish not found",
                data: null,
            }
        // create comment
        console.log({
            commentContent: content,
            rating: rating,
            customerId: userId,
            dishId: dishId,
        })
        await Comment.create({
            commentContent: content,
            rating: rating,
            customerId: userId,
            dishId: dishId,
        })
        return {
            statusCode: 201,
            message: "Comment created successfully",
            data: null,
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            message: error.message,
            data: null,
        }
    }

}

module.exports = {
    createComment,
}