

module.exports = (sequelize, DataTypes) => {
    const Candidatestatus = sequelize.define("candidatestatus", {

        candidateStatusId: {
            type: DataTypes.INTEGER
        },
        candidateId: {
            type: DataTypes.INTEGER,
        },
        statusId: {
            type: DataTypes.INTEGER
        },
        remark: {
            type: DataTypes.TEXT
        },
        createdBy: {
            type: DataTypes.INTEGER
        }
        ,
        updatedBy: {
            type: DataTypes.INTEGER
        },
        deletedBy: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE

        },
        updatedAt: {
            type: DataTypes.DATE

        },
        deletedAt: {
            type: DataTypes.DATE

        },
    })

    return Candidatestatus
}