const DataTypes = require("sequelize");
const sequelize = require("../config/dbConfig");
// module.exports = (sequelize, DataTypes) => {
const Candidate = sequelize.define("candidate", {
  candidateId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,

    primaryKey: true,
  },
  applicationNumber: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  Contact: {
    type: DataTypes.STRING,
  },
  jobProfileId: {
    type: DataTypes.INTEGER,
  },
  currentCTC: {
    type: DataTypes.STRING,
  },
  expectedCTC: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  isRelocate: {
    type: DataTypes.STRING,
  },
  reasonForJobChange: {
    type: DataTypes.STRING,
  },
  noticePeriod: {
    type: DataTypes.STRING,
  },
  experience: {
    type: DataTypes.STRING,
  },
  otherInfo: {
    type: DataTypes.STRING,
  },
  // email: {
  //     type: DataTypes.STRING

  // },
  // createdBy: {
  //     type: DataTypes.INTEGER
  // }
  // ,
  // updatedBy: {
  //     type: DataTypes.INTEGER
  // }
});

module.exports = Candidate;
//     return Candidate
// }
