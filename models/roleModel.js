

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("role", {
        roleId: {
            type: DataTypes.INTEGER
        },
        roleName: {
            type: DataTypes.TEXT,
        }

    })
    return Role
}