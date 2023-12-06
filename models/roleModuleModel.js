

module.exports = (sequelize, DataTypes) => {
    const RoleModule = sequelize.define("rolemodule", {
        roleModuleId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        moduleId: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        isViewed: {
            type: DataTypes.STRING,
            allowNull: false

        },
        isEdited: {
            type: DataTypes.STRING,
            allowNull: false

        },
        createdBy: {
            type: DataTypes.INTEGER
        }
        ,
        updatedBy: {
            type: DataTypes.INTEGER
        }
    })
    return RoleModule
}