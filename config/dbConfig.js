const Sequelize = require("sequelize");

const sequelize = new Sequelize("hrms", "root", "Krenil@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
