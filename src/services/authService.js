const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = db.users;

const register = async (body) => {
    try {
        const { username, email, password } = body;
        if (!username || !email || !password)
            return {
                statusCode: 400,
                message: 'Please provide all required fields.',
                data: null,
            }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await users.create({
            username: username,
            email: email,
            password: hashedPassword
        });
        console.log('User created successfully.')
        return {
            statusCode: 201,
            message: 'User created successfully.',
            data: null,
        };

    } catch (err) {
        throw err;
    }
}

const login = async (email, password) => {
    try {
        const user = await users.findOne({ where: { email } });
        if (!user) throw new Error('User does not exist.');
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Invalid password.');
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        return { accessToken, refreshToken };
    } catch (err) {
        throw err;
    }
}

const logout = async (refreshToken) => {
    try {
        await jwt.destroy(refreshToken);
    } catch (err) {
        throw err;
    }
}

const forgotPassword = async (email) => {
    try {
        const user = await users.findOne({ where: { email } });
        if (!user) throw new Error('User does not exist.');
        const resetToken = jwt.sign({ id: user.id }, process.env.RESET_TOKEN_SECRET, { expiresIn: '15m' });
        return resetToken;
    } catch (err) {
        throw err;
    }
}

const refreshToken = async (refreshToken) => {
    try {
        const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        return accessToken;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    refreshToken
}