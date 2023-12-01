const db = require('../models');
const BillModel = db.bill;

const getRevenueOfAllTime = async () => {
    try {
        const result = await BillModel.findOne({
            attributes: [
                [db.sequelize.fn('sum', db.sequelize.col('total_money')), 'revenue'],
            ],
            where: {
                billPayed: 1,
            }
        })

        if (!result) {
            return {
                statusCode: 404,
                message: 'Failed to get revenue of all time'
            }
        }

        return {
            statusCode: 200,
            message: 'Get revenue of all time successfully',
            data: result.dataValues.revenue ? result.dataValues.revenue : 0,
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
    getRevenueOfAllTime,
}