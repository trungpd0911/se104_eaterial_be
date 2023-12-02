module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('employee', {
        employeeName: {
            field: 'employee_name',
            type: DataTypes.STRING,
            allowNull: false
        },
        employeePosition: {
            field: 'employee_possition',
            type: DataTypes.STRING,
            allowNull: false
        },
        staffCode: {
            field: 'staff_code',
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        startWorkingDay: {
            field: 'start_working_day',
            type: DataTypes.STRING,
            allowNull: true
        },
        salary: {
            type: DataTypes.STRING,
            allowNull: true
        },
        workShift: {
            field: 'work_shift',
            type: DataTypes.STRING,
            allowNull: true
        },
        phoneNumber: {
            field: 'phone_number',
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

    return Employee;
}