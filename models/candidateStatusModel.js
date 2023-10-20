const DataTypes = require("sequelize");
const sequelize = require("../config/dbConfig");

// module.exports = (sequelize, DataTypes) => {
const Candidatestatus = sequelize.define("candidatestatus", {
  candidateStatusId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  candidateId: {
    type: DataTypes.INTEGER,
  },
  statusId: {
    type: DataTypes.INTEGER,
  },
  remark: {
    type: DataTypes.STRING,
  },
  createdBy: {
    type: DataTypes.INTEGER,
  },
  updatedBy: {
    type: DataTypes.INTEGER,
  },
  deletedBy: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
});

module.exports = Candidatestatus;
// };
