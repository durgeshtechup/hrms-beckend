

module.exports = (sequelize, DataTypes) => {
    const Staffdocument = sequelize.define("staffdocument", {

        staffDocumentId: {
            type: DataTypes.INTEGER
        },
        employeCode: {
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

    return Staffdocument
}