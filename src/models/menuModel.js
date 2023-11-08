module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('menu', {
        menuName: {
            field: 'menu_name',
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

    return Menu;
}