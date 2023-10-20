

module.exports = (sequelize, DataTypes) => {
    const Candidateskill = sequelize.define("candidateskill", {

        candidateSkillId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        rating: {
            type: DataTypes.STRING,
        },
        candidateId: {
            type: DataTypes.INTEGER
        },
        technologyId: {
            type: DataTypes.INTEGER
        },
        createdBy: {
            type: DataTypes.INTEGER
        }
        ,
        updatedBy: {
            type: DataTypes.INTEGER
        }
    })

    return Candidateskill
}