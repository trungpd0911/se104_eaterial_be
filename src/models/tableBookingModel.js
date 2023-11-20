module.exports = (sequelize, DataTypes) => {
    const TableBooking = sequelize.define('table_booking', {
        userId: {
            field: 'user_id',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tableId: {
            field: 'table_id',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookingTime: {
            field: 'booking_time',
            type: DataTypes.DATE,
            allowNull: true
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

    return TableBooking;
}