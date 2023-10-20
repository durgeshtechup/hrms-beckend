

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employeCode: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        roleId: {
            type: DataTypes.INTEGER
        },
        createdBy: {
            type: DataTypes.INTEGER
        }
        ,
        updatedBy: {
            type: DataTypes.INTEGER
        }
    })

    return User
}