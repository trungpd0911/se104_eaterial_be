const db = require('../models/index')
const userModel = db.users;

const getAllUsers = async () => {
}

const getUserByID = async (id) => {
    try {
        const user = await userModel.findByPk(id);
        if (user) {
            return {
                status: 200,
                message: 'User found',
                data: user
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

const updateUser = async (id, user) => {
    try {
        const updatedUser = await userModel.update(user, {
            where: {
                id: id
            }
        });
        if (updatedUser[0]) {
            return {
                status: 200,
                message: 'User updated successfully'
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

module.exports = {
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser
}