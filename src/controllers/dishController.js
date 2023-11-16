const dishService = require('../services/dishService');

// CRUD dish
const createDish = async (req, res) => {
    // take all data from file upload and body
    const fileImages = req.files;
    const response = await dishService.createDish(fileImages, req.body);
    res.status(response.statusCode).json(response);
}

const getAllDishes = async (req, res) => {
    const response = await dishService.getAllDishes();
    res.status(response.statusCode).json(response);
}

const getDishByID = async (req, res) => {
    const id = req.params.id;
    const response = await dishService.getDishByID(id);
    res.status(response.statusCode).json(response);
}


const updateDish = async (req, res) => {
    const id = req.params.id;
    const fileImages = req.files;
    const response = await dishService.updateDish(id, req.body, fileImages);
    return res.status(response.statusCode).json(response);
}

const deleteDish = async (req, res) => {
    const id = req.params.id;
    const response = await dishService.deleteDish(id);
    res.status(response.statusCode).json(response);
}

const deleteDishImage = async (req, res) => {
    const imageId = req.params.imageId;
    const response = await dishService.deleteDishImage(imageId);
    res.status(response.statusCode).json(response);
}

const addComment = async (req, res) => {
    const id = req.params.id;
    const response = await dishService.addComment(id, req.body);
    res.status(response.statusCode).json(response);
}

const getAllComments = async (req, res) => {
    const id = req.params.id;
    const response = await dishService.getAllComments(id);
    res.status(response.statusCode).json(response);
}

const getCommentByID = async (req, res) => {
    const id = req.params.id;
    const commentId = req.params.commentId;
    const response = await dishService.getCommentByID(id, commentId);
    res.status(response.statusCode).json(response);
}

const updateComment = async (req, res) => {
    const id = req.params.id;
    const commentId = req.params.commentId;
    const response = await dishService.updateComment(id, commentId, req.body);
    res.status(response.statusCode).json(response);
}

const deleteComment = async (req, res) => {
    const id = req.params.id;
    const commentId = req.params.commentId;
    const response = await dishService.deleteComment(id, commentId);
    res.status(response.statusCode).json(response);
}

module.exports = {
    getAllDishes,
    getDishByID,
    createDish,
    updateDish,
    deleteDish,
    deleteDishImage,
    addComment,
    getAllComments,
    getCommentByID,
    updateComment,
    deleteComment,
}