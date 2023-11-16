const db = require('../models');
const Menu = db.menu;
const Dish = db.dish;
const Image = db.image;

const createMenu = async (data) => {
    try {
        const { menuName } = data;
        if (!menuName) {
            return {
                statusCode: 400,
                message: 'Menu name is required',
                data: null,
            }
        }
        await Menu.create({
            menuName,
        });
        return {
            statusCode: 201,
            message: 'Create menu successfully',
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

const getAllMenus = async () => {
    try {
        const menus = await Menu.findAll();
        return {
            statusCode: 200,
            message: 'Get all menus successfully',
            data: menus,
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
            data: null,
        }
    }
}

const getMenuByID = async (id) => {
    try {
        const menu = await Menu.findByPk(id);
        if (!menu) {
            return {
                statusCode: 404,
                message: 'Menu not found',
                data: null,
            }
        }
        return {
            statusCode: 200,
            message: 'Get menu by id successfully',
            data: menu,
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
            data: null,
        }
    }
}

const updateMenu = async (id, data) => {
    try {
        const { menuName } = data;
        if (!menuName) {
            return {
                statusCode: 400,
                message: 'Menu name is required',
                data: null,
            }
        }
        const menu = await Menu.findByPk(id);
        if (!menu) {
            return {
                statusCode: 404,
                message: 'Menu not found',
                data: null,
            }
        }
        await Menu.update({ menuName, }, {
            where: {
                id,
            }
        });
        return {
            statusCode: 200,
            message: 'Update menu successfully',
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

const deleteMenu = async (id) => {
    try {
        const menu = await Menu.findByPk(id);
        if (!menu) {
            return {
                statusCode: 404,
                message: 'Menu not found',
                data: null,
            }
        }
        await Menu.destroy({
            where: {
                id,
            }
        });
        return {
            statusCode: 200,
            message: 'Delete menu successfully',
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

const getAllDishesByMenuID = async (id) => {
    try {
        const menu = await Menu.findByPk(id);
        if (!menu) {
            return {
                statusCode: 404,
                message: 'Menu not found',
                data: null,
            }
        }
        const dishes = await Dish.findAll({
            where: {
                menuId: id,
            },
            include: [
                {
                    model: Menu,
                    attributes: ['menuName'],
                },
                {
                    model: Image,
                    attributes: ['imageLink', 'id'],
                }
            ]
        });
        if (!dishes) {
            return {
                statusCode: 404,
                message: 'no dish found in this menu',
                data: null,
            }
        }
        return {
            statusCode: 200,
            message: 'Get all dishes by menu id successfully',
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

module.exports = {
    createMenu,
    getAllMenus,
    getMenuByID,
    updateMenu,
    deleteMenu,
    getAllDishesByMenuID,
}