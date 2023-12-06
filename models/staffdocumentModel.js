

module.exports = (sequelize, DataTypes) => {
    const Staffdocument = sequelize.define("staffdocument", {

        staffDocumentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        staffId: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        docType: {
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

    return Staffdocument
}