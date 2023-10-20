// module.exports = (sequelize, DataTypes) => {
//   const Candidatedocument = sequelize.define("candidatedocument", {
//     candidateDocumentId: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     candidateId: {
//       type: DataTypes.INTEGER,
//     },
//     fileType: {
//       type: DataTypes.STRING,
//     },
//     docPath: {
//       type: DataTypes.STRING,
//     },
//     docName: {
//       type: DataTypes.STRING,
//     },
//     createdBy: {
//       type: DataTypes.INTEGER,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//     },
//     updatedBy: {
//       type: DataTypes.INTEGER,
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//     },
//     deletedBy: {
//       type: DataTypes.INTEGER,
//     },
//     deletedAt: {
//       type: DataTypes.DATE,
//     },
//   });

//   return Candidatedocument;
// };

const DataTypes = require("sequelize");
const sequelize = require("../config/dbConfig");

const Candidatedocument = sequelize.define("candidatedocument", {
  candidateDocumentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  candidateId: {
    type: DataTypes.INTEGER,
  },
  fileType: {
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
module.exports = Candidatedocument;
