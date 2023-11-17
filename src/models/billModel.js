module.exports = (sequelize, DataTypes) => {
    const Bill = sequelize.define('bill', {
        userId: {
            field: 'user_id',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        billDate: {
            field: 'bill_date',
            type: DataTypes.STRING,
            allowNull: true
        },
        totalMoney: {
            field: 'total_money',
            type: DataTypes.STRING,
            allowNull: true
        },
        billPayed: {
            field: 'bill_payed',
            type: DataTypes.STRING,
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

    return Bill;
}