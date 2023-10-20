const DataTypes = require("sequelize");
const sequelize = require("../config/dbConfig");

const Status = sequelize.define("status", {
  statusId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  statusName: {
    type: DataTypes.STRING,
  },
});

module.exports = Status;
