const db = require('../models/index')
const Dish = db.dish;
const Menu = db.menu;
const Image = db.image;
const cloudinary = require('cloudinary').v2;

const createDish = async (fileImages, data) => {
    const { dishName, menuName, dishPrice, dishDescription } = data;
    try {
        const checkMenuExist = await Menu.findOne({ where: { menuName } });
        if (!checkMenuExist) {
            return {
                statusCode: 404,
                message: 'Menu not found',
                data: null,
            }
        }
        const newDish = await Dish.create({
            dishName: dishName,
            dishPrice: dishPrice,
            dishDescription: dishDescription,
            menuId: checkMenuExist.id,
        });
        // take all image url from cloudinary
        if (fileImages) {
            // update to image table
            for (let fileImage of fileImages) {
                await Image.create({
                    imageLink: fileImage.path,
                    dishId: newDish.id,
                    imageFilename: fileImage.filename,
                });
            }
        }
        return ({
            statusCode: 201,
            message: 'Create dish successfully',
            data: null,
        });
    } catch (error) {
        // destroy all image uploaded
        if (fileImages) {
            for (let fileImage of fileImages) {
                cloudinary.uploader.destroy(fileImage.filename);
            }
        }
        return {
            statusCode: 500,
            message: error.message,
            data: null,
        }
    }
}

const getAllDishes = async () => {
    try {
        const dishes = await Dish.findAll({
            include: [
                {
                    model: Image,
                    attributes: ['imageLink', 'id'],
                },
                {
                    model: Menu,
                    attributes: ['menuName'],
                }
            ]
        });
        if (!dishes) {
            return {
                statusCode: 404,
                message: 'Dish not found',
                data: null,
            }
        }
        return {
            statusCode: 200,
            message: 'Get all dishes successfully',
            data: dishes,
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
            data: null,
        }
    }
}

const getDishByID = async (id) => {
    try {
        const dishes = await Dish.findOne({
            where: { id },
            include: [
                {
                    // include Id and imageLink of image table
                    model: Image,
                    attributes: ['imageLink', 'id'],
                },
                {
                    model: Menu,
                    attributes: ['menuName'],
                }
            ]
        });
        if (!dishes) {
            return {
                statusCode: 404,
                message: 'Dish not found',
                data: null,
            }
        }
        return {
            statusCode: 200,
            message: 'Get dish by id successfully',
            data: dishes,
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
            data: null,
        }
    }
}

const updateDish = async (id, data, fileImages) => {
    try {
        const { dishName, menuName, dishPrice, dishDescription } = data;
        if (!dishName || !menuName || !dishPrice || !dishDescription)
            return {
                statusCode: 400,
                message: 'Missing data',
                data: null,
            }
        const dish = await Dish.findOne({ where: { id } });
        if (!dish)
            return {
                statusCode: 404,
                message: 'Dish not found',
                data: null,
            }
        const checkMenuExist = await Menu.findOne({ where: { menuName } });
        if (!checkMenuExist) {
            return {
                statusCode: 404,
                message: 'Menu not found',
                data: null,
            }
        }
        dish.dishName = dishName;
        dish.menuId = checkMenuExist.id;
        dish.dishPrice = dishPrice;
        dish.dishDescription = dishDescription;
        await dish.save();
        // update to image table
        if (fileImages) {
            for (let fileImage of fileImages) {
                await Image.create({
                    imageLink: fileImage?.path,
                    dishId: dish.id,
                    imageFilename: fileImage?.filename,
                });
            }
        }
        return {
            statusCode: 200,
            message: 'Update dish successfully',
            data: null,
        }
    } catch (error) {
        if (fileImages) {
            for (let fileImage of fileImages) {
                cloudinary.uploader.destroy(fileImage.filename);
            }
        }
        return {
            statusCode: 500,
            message: error.message,
            data: null,
        }
    }
}

const deleteDish = async (id) => {
    try {
        const dish = await Dish.findOne({ where: { id } });
        if (!dish)
            return {
                statusCode: 404,
                message: 'Dish not found',
                data: null,
            }
        // const imageDish = await Image.findAll({ where: { dishId: id } });
        // if (imageDish) {
        //     for (let image of imageDish) {
        //         cloudinary.uploader.destroy(image.imageFilename);
        //         await image.destroy();
        //     }
        // }
        await dish.destroy();
        return {
            statusCode: 200,
            message: 'Delete dish successfully',
            data: null,
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
            data: null,
        }
    }
}

const deleteDishImage = async (imageId) => {
    try {
        const image = await Image.findOne({ where: { id: imageId } });
        if (!image)
            return {
                statusCode: 404,
                message: 'Image not found',
                data: null,
            }
        cloudinary.uploader.destroy(image.imageFilename);
        await image.destroy();
        return {
            statusCode: 200,
            message: 'Delete image successfully',
            data: null,
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
            data: null,
        }
    }

}


module.exports = {
    createDish,
    getAllDishes,
    getDishByID,
    updateDish,
    deleteDish,
    deleteDishImage,
}

