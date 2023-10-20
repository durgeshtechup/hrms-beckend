const DataTypes = require("sequelize");
const sequelize = require("../config/dbConfig");

const Staffdocument = sequelize.define("staffdocument", {
  staffDocumentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employeCode: {
    type: DataTypes.STRING,
  },
  docPath: {
    type: DataTypes.STRING,
  },
  docName: {
    type: DataTypes.STRING,
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
  },
});

module.exports = Staffdocument;
