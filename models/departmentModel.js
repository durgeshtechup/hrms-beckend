

module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define("department", {

        departmentId: {
            type: DataTypes.INTEGER
        },
        profileId: {
            type: DataTypes.INTEGER,
        },
        profileName: {
            type: DataTypes.TEXT
        },
        createdBy: {
            type: DataTypes.INTEGER
        }
        ,
        updatedBy: {
            type: DataTypes.INTEGER
        }
    })

    return Department
}