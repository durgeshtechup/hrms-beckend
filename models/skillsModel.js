

module.exports = (sequelize, DataTypes) => {
    const skill = sequelize.define("skills", {

        skillId: {
            type: DataTypes.INTEGER
        },
        technologyId: {
            type: DataTypes.INTEGER,
        },
        technology: {
            type: DataTypes.TEXT,
        }

    })

    return skill
}