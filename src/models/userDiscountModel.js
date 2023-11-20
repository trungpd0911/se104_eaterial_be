// user - discount model
module.exports = (sequelize, DataTypes) => {
    const UserDiscount = sequelize.define('user_discount', {
        userId: {
            field: 'user_id',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        discountId: {
            field: 'discount_id',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        used: {
            field: 'used',
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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

    return UserDiscount;
}