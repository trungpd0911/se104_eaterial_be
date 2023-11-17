const commentService = require("../services/commentService")

const createComment = async (req, res) => {
    const userId = req.user.id;
    const response = await commentService.createComment(userId, req.body);
    res.status(response.statusCode).json(response)
}


module.exports = {
    createComment,
}