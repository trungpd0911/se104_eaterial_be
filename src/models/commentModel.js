module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        commentContent: {
            field: 'comment_content',
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            field: 'rating',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customerId: {
            field: 'customer_id',
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

    return Comment;
}