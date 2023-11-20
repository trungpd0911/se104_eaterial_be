const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = db.user;
require('dotenv').config();
let refreshTokens = [];

const register = async (body) => {
    try {
        const { username, email, password } = body;
        if (!username || !email || !password)
            return {
                statusCode: 400,
                message: 'Please provide all required fields.',
                data: null,
            }
        const checkUserExist = await user.findOne({ where: { email } });
        if (checkUserExist)
            return {
                statusCode: 409,
                message: 'User already exist.',
                data: null,
            }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await user.create({
            username: username,
            email: email,
            password: hashedPassword
        });
        return {
            statusCode: 201,
            message: 'User created successfully.',
            data: null,
        };

    } catch (err) {
        throw err;
    }
}

// token 
const generateAccessToken = (User) => {
    return jwt.sign(
        {
            id: User.id,
            isAdmin: User.isAdmin,
        },
        process.env.SECRET_ACCESS_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    )
}
const generateRefreshToken = (User) => {
    return jwt.sign(
        {
            id: User.id,
            isAdmin: User.isAdmin,
        },
        process.env.SECRET_REFRESH_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    )
}

const login = async (data) => {
    try {
        const { email, password } = data;
        if (!email || !password)
            return {
                statusCode: 400,
                message: 'Please provide all required fields.',
                data: null,
            }
        // sequelize auto checked SQL Injection

        const userLogin = await user.findOne({ where: { email } });
        if (!userLogin)
            return {
                statusCode: 401,
                message: 'Incorrect email or password.',
                data: null,
            }
        const isPasswordCorrect = await bcrypt.compare(password, userLogin.password);
        if (!isPasswordCorrect) {
            return {
                statusCode: 401,
                message: 'Incorrect email or password.',
                data: null,
            }
        }
        if (userLogin && isPasswordCorrect) {
            const accessToken = generateAccessToken(userLogin);
            const refreshToken = generateRefreshToken(userLogin);
            refreshTokens.push(refreshToken);
            const { password, ...info } = userLogin.dataValues;
            return {
                statusCode: 200,
                message: 'Login successfully.',
                data: { ...info, accessToken, refreshToken },
            }
        }
    } catch (err) {
        throw err;
    }
}

const logout = async (refreshToken) => {
    try {
        refreshTokens = refreshTokens.filter(token => token !== refreshToken);
        return {
            statusCode: 200,
            message: 'Logout successfully.',
            data: null,
        }
    } catch (err) {
        throw err;
    }
}

const forgotPassword = async (email) => {
    try {
        const user = await user.findOne({ where: { email } });
        if (!user) throw new Error('User does not exist.');
        const resetToken = jwt.sign({ id: user.id }, process.env.RESET_TOKEN_SECRET, { expiresIn: '15m' });
        return resetToken;
    } catch (err) {
        throw err;
    }
}

const refreshToken = async (refreshToken) => {
    try {
        //Send error if token is not valid
        if (!refreshToken)
            return {
                statusCode: 403,
                message: 'Refresh token is not valid.',
                data: null,
            }
        if (!refreshTokens.includes(refreshToken))
            return {
                statusCode: 403,
                message: 'Refresh token is not valid.',
                data: null,
            }
        // jwt verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY);
        if (!decoded)
            return {
                statusCode: 403,
                message: 'Refresh token is not valid.',
                data: null,
            }
        refreshTokens = refreshTokens.filter(token => token !== refreshToken);
        const newAccessToken = generateAccessToken(decoded);
        const newRefreshToken = generateRefreshToken(decoded);
        refreshTokens.push(newRefreshToken);
        return {
            statusCode: 200,
            message: 'Refresh token successfully.',
            data: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            },
        }
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