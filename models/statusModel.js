

module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define("status", {

        statusId: {
            type: DataTypes.INTEGER
        },
        statusName: {
            type: DataTypes.TEXT,
        }

    })

    return Status
}