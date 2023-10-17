

module.exports = (sequelize, DataTypes) => {
    const Candidatedocument = sequelize.define("candidatedocument", {

        candidateDocumentId: {
            type: DataTypes.INTEGER
        },
        candidateId: {
            type: DataTypes.TEXT,
        },
        docPath: {
            type: DataTypes.TEXT,
        },
        docName: {
            type: DataTypes.TEXT,
        },
        createdBy: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedBy: {
            type: DataTypes.INTEGER,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        deletedBy: {
            type: DataTypes.INTEGER,
        },
        deletedAt: {
            type: DataTypes.DATE,
        }

    })

    return Candidatedocument
}