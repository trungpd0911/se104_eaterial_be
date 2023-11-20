module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define('discount', {
        discountCode: {
            field: 'discount_code',
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        discountDecription: {
            field: 'discount_description',
            type: DataTypes.STRING,
            allowNull: false
        },
        discountPercent: {
            field: 'discount_percent',
            type: DataTypes.INTEGER,
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