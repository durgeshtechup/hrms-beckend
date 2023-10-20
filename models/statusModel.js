

module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define("status", {

        statusId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        statusName: {
            type: DataTypes.STRING,
        }

    })

    return Status
}