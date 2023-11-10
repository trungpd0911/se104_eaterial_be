const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const body = req.body;
        const response = await authService.register(body);
        res.status(response.statusCode).json(response);
    } catch (err) {
        res.status(500).json(err);
    }
}

const login = async (req, res) => {
    try {
        const response = await authService.login(req.body);
        res.status(response.statusCode).json(response);
    } catch (err) {
        res.status(500).json(err);
    }
}

const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        await authService.logout(refreshToken);
        res.status(200).json('User logged out.');
    } catch (err) {
        res.status(500).json(err);
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        await authService.forgotPassword(email);
        res.status(200).json('Password reset email sent.');
    } catch (err) {
        res.status(500).json(err);
    }
}

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const tokens = await authService.refreshToken(refreshToken);
        res.status(200).json(tokens);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    refreshToken
}