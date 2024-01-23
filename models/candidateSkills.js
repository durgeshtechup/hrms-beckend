module.exports = (sequelize, DataTypes) => {
  const Candidateskill = sequelize.define("candidateskill", {
    candidateSkillId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.STRING,
    },
    candidateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    skillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    OtherSkill: {
      type: DataTypes.STRING,
      default: "",
    },
    createdBy: {
      type: DataTypes.INTEGER,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
    },
  });

  return Candidateskill;
};
