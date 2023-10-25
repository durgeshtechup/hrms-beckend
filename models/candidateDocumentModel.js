

module.exports = (sequelize, DataTypes) => {
    const Candidatedocument = sequelize.define("candidatedocument", {

        candidateDocumentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        candidateId: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        fileType: {
            type: DataTypes.STRING,
            allowNull: false


        },
        docPath: {
            type: DataTypes.STRING,
            allowNull: false

        },
        docName: {
            type: DataTypes.STRING,
            allowNull: false

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