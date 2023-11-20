const menuService = require('../services/menuService');

const createMenu = async (req, res) => {
    const response = await menuService.createMenu(req.body);
    res.status(response.statusCode).json(response);
}

const getAllMenus = async (req, res) => {
    const response = await menuService.getAllMenus();
    res.status(response.statusCode).json(response);
}

const getMenuByID = async (req, res) => {
    const response = await menuService.getMenuByID(req.params.id);
    res.status(response.statusCode).json(response);
}

const updateMenu = async (req, res) => {
    const response = await menuService.updateMenu(req.params.id, req.body);
    res.status(response.statusCode).json(response);
}

const deleteMenu = async (req, res) => {
    const response = await menuService.deleteMenu(req.params.id);
    res.status(response.statusCode).json(response);
}

const getAllDishesByMenuID = async (req, res) => {
    const response = await menuService.getAllDishesByMenuID(req.params.id);
    res.status(response.statusCode).json(response);
}

module.exports = {
    createMenu,
    getAllMenus,
    getMenuByID,
    updateMenu,
    deleteMenu,
    getAllDishesByMenuID,
}