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

function generateRandomPassword() {
    const length = 8;
    const numbers = '0123456789';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Combine numbers and letters to create the character pool
    const characterPool = numbers + letters;

    let password = '';

    // Ensure at least one number and one letter in the password
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += letters.charAt(Math.floor(Math.random() * letters.length));

    // Generate the rest of the password
    for (let i = 2; i < length; i++) {
        password += characterPool.charAt(Math.floor(Math.random() * characterPool.length));
    }

    // Shuffle the password characters
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
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
        // random new password must be at least 8 characters and contain at least 1 number and 1 letter.
        const newPassword = generateRandomPassword();
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
                <!DOCTYPE html>
                <html lang="en">
        
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Password</title>
                </head>
        
                <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
                    <table
                        style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <tr>
                            <td align="center">
                                <h2 style="color: #333;">4FoodEateria</h2>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p style="color: #242424;">Dear ${user.username},</p>
                                <p style="color: #242424;">Your new password has been generated successfully. Please use the following password
                                    to
                                    log in: </p>
                                <div
                                    style="font-size: 1.2em; padding: 10px; background-color: #f9f9f9; border-radius: 5px; word-wrap: break-word; overflow-wrap: break-word; color: #333; text-align: center; position: relative;">
                                    <!-- Place the generated password here -->
                                    ${newPassword}
                                    <div onclick="copyToClipboard('${newPassword}')"
                                        style="position: absolute; right: 32%; top: 28%;cursor: pointer;">
                                        <i style="font-size: 1.5em; color: #333;" class="fas fa-copy" id="copy"></i>
                                    </div>
                                </div>
                                <p style="color: #242424; margin-bottom: 10px;">If you did not request a new password, please let us know
                                    immediately by replying to
                                    this email. We recommend changing your password after logging in for security purposes.</p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <p style="color: #242424;">Thank you for using our services!</p>
                            </td>
                        </tr>
                    </table>
                    <script>
                        function copyToClipboard(text) {
                            navigator.clipboard.writeText(text);
                            document.getElementById("copy").classList.value = 'fas fa-check';
                        }
                    </script>
                </body>
        
                </html>
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
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(newPassword))
            return {
                statusCode: 403,
                message: 'Password must be at least 8 characters and contain at least 1 number and 1 letter.',
                data: null,
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