

module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define("department", {

        departmentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        profileId: {
            type: DataTypes.INTEGER,
        },
        profileName: {
            type: DataTypes.STRING
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