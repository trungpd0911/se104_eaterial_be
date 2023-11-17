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

module.exports = {
    getAllDishes,
    getDishByID,
    createDish,
    updateDish,
    deleteDish,
    deleteDishImage,
}