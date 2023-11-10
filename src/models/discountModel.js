module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define('discount', {
        adminId: {
            field: 'admin_id',
            type: DataTypes.STRING,
            allowNull: false
        },
        discountValue: {
            field: 'discount_value',
            type: DataTypes.STRING,
            allowNull: false
        },
        startDay: {
            field: 'start_day',
            type: DataTypes.STRING,
            allowNull: false
        },
        endDay: {
            field: 'end_day',
            type: DataTypes.STRING,
            allowNull: false
        },
        // change name createdAt to created_at and auto generate
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        // change name updatedAt to updated_at and auto generate
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }

    });

    return Discount;
}