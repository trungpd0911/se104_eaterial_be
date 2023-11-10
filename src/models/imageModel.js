module.exports = (sequelize, DataTypes) => {
    const image = sequelize.define('image', {
        imageId: {
            field: 'image_id',
            type: DataTypes.STRING,
            allowNull: false
        },
        imageLink: {
            field: 'image_link',
            type: DataTypes.STRING,
            allowNull: false
        },
        dishId: {
            field: 'dish_id',
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

    return image;
}