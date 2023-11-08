const db = require('../models/index')
const userModel = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    const response = await userService.getAllUsers();
    res.status(response.status).json(response);
}

const getUserByID = async (req, res) => {
    const id = req.params.id;
    const response = await userService.getUserByID(id);
    res.status(response.status).json(response);
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const response = await userService.updateUser(id, req.body);
    res.status(response.status).json(response);
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const response = await userService.deleteUser(id);
    res.status(response.status).json(response);
}

module.exports = {
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser
}