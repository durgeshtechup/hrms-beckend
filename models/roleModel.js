const DataTypes = require("sequelize");
const sequelize = require("../config/dbConfig");

const Role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  roleName: {
    type: DataTypes.STRING,
  },
});
module.exports = Role;
