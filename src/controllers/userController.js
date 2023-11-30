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
    const fileData = req.file;
    const response = await userService.updateUser(id, fileData, req.body);
    res.status(response.status).json(response);
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const response = await userService.deleteUser(id);
    res.status(response.status).json(response);
}

const forgotPassword = async (req, res) => {
    const email = req.body.email;
    const response = await userService.forgotPassword(email);
    res.status(response.status).json(response);
}

const changePassword = async (req, res) => {
    const id = req.params.id;
    const response = await userService.changePassword(id, req.body);
    res.status(response.status).json(response);
}

const getMe = async (req, res) => {
    const id = req.user.id;
    const response = await userService.getMe(id);
    res.status(response.status).json(response);
}


module.exports = {
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser,
    forgotPassword,
    changePassword,
    getMe
}