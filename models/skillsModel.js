const DataTypes = require("sequelize");
const sequelize = require("../config/dbConfig");

const skill = sequelize.define("skills", {
  skillId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  technologyId: {
    type: DataTypes.INTEGER,
  },
  technology: {
    type: DataTypes.STRING,
  },
});

module.exports = skill;
