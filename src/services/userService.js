const db = require('../models/index')
const nodeMailer = require('nodemailer');
const userModel = db.user;
const bcrypt = require('bcrypt');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const getAllUsers = async () => {
    try {
        const users = await userModel.findAll();
        if (!users)
            return {
                status: 404,
                message: 'no users found in database',
                data: null,
            }
        return {
            status: 200,
            message: 'Users found',
            data: users
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
            data: null,
        }
    }
}

const getUserByID = async (id) => {
    try {
        const user = await userModel.findByPk(id);
        if (!user)
            return {
                status: 404,
                message: 'User not found',
                data: null,
            }
        return {
            status: 200,
            message: 'User found',
            data: user
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message,
            data: null,
        }
    }
}

const updateUser = async (id, fileData, data) => {
    try {
        const { username, gender, address, phoneNumber } = data;
        const user = await userModel.findByPk(id);
        if (!user)
            return {
                status: 404,
                message: 'User not found',
                data: null,
            }
        // update user
        user.username = username;
        user.gender = gender;
        user.address = address;
        user.phoneNumber = phoneNumber;
        if (fileData) {
            user.avatar = fileData?.path;
        }
        await user.save();
        return {
            status: 200,
            message: 'User updated successfully',
            data: user,
        }
    } catch (error) {
        cloudinary.uploader.destroy(fileData.filename);
        return {
            status: 500,
            message: error.message,
            data: null,
        }
    }

}

const deleteUser = async (id) => {
    try {
        const deletedUser = await userModel.destroy({
            where: {
                id: id
            }
        });
        if (deletedUser) {
            return {
                status: 200,
                message: 'User deleted successfully'
            }
        } else {
            return {
                status: 404,
                message: 'User not found'
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}

const forgotPassword = async (email) => {
    try {
        const user = await userModel.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            return {
                status: 404,
                message: 'User not found'
            }
        }
        // random new password
        const newPassword = Math.random().toString(36).slice(-8);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        // send email about new password to user
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_HOST,
                pass: process.env.PASS_NODEMAILER,
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_HOST,
            to: email,
            subject: "Reset Password for 4food Eaterial",
            html: `
            <h1>Reset Password for 4food Eaterial</h1>
            <h2>Hi ${user.username},</h2>
            <h2>Your new password is: <b>${newPassword}</b></h2>
            `,
        };

        transporter.sendMail(mailOptions, async (err) => {
            if (err) {
                return {
                    status: 500,
                    message: err.message
                }
            } else {
                await user.save();
                return {
                    status: 200,
                    message: 'New password sent to your email',
                }
            }
        })
        return {
            status: 200,
            message: 'New password sent to your email',
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}

const changePassword = async (id, data) => {
    const { oldPassword, newPassword } = data;
    try {
        const user = await userModel.findByPk(id);
        if (!user) {
            return {
                status: 404,
                message: 'User not found'
            }
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return {
                status: 400,
                message: 'Old password is incorrect'
            }
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        return {
            status: 200,
            message: 'Password changed successfully'
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}

const getMe = async (id) => {
    try {
        const user = await userModel.findByPk(id);
        if (!user) {
            return {
                status: 404,
                message: 'User not found'
            }
        }
        return {
            status: 200,
            message: 'User found',
            data: user
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
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