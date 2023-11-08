module.exports = (sequelize, DataTypes) => {
    const Dish = sequelize.define('dish', {
        dishName: {
            field: 'dish_name',
            type: DataTypes.STRING,
            allowNull: false
        },
        dishTypeId: {
            field: 'dish_type_id',
            type: DataTypes.STRING,
            allowNull: false
        },
        dishPrice: {
            field: 'dish_price',
            type: DataTypes.STRING,
            allowNull: false
        },
        dishDescription: {
            field: 'dish_description',
            type: DataTypes.STRING,
            allowNull: false
        },
        dishImage: {
            field: 'dish_image',
            type: DataTypes.STRING,
            allowNull: false
        },
        totalOrder: {
            field: 'total_order',
            type: DataTypes.STRING,
            allowNull: false
        },
        discountId: {
            field: 'discount_id',
            type: DataTypes.STRING,
            allowNull: false
        },
        menuId: {
            field: 'menu_id',
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

    return Dish;
}