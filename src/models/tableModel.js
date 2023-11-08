module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define('table', {
        tablePossition: {
            field: 'table_possition',
            type: DataTypes.STRING,
            allowNull: false
        },
        tableStatus: {
            field: 'table_status',
            type: DataTypes.STRING,
            allowNull: false
        },
        tableType: {
            field: 'table_type',
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

    return Table;
}