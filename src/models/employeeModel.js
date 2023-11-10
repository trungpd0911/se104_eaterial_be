module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('employee', {
        employeePossition: {
            field: 'employee_possition',
            type: DataTypes.STRING,
            allowNull: false
        },
        totalWorkingTime: {
            field: 'total_working_time',
            type: DataTypes.STRING,
            allowNull: false
        },
        salary: {
            type: DataTypes.STRING,
            allowNull: true
        },
        startWorkingDay: {
            field: 'start_working_day',
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

    return Employee;
}