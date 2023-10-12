

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        employeCode: {
            type: DataTypes.TEXT
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.TEXT
        },
        roleId: {
            type: DataTypes.INTEGER
        },
    })

    return User
}