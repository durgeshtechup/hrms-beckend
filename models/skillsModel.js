

module.exports = (sequelize, DataTypes) => {
    const skill = sequelize.define("skills", {

        skillId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        technologyId: {
            type: DataTypes.INTEGER,
        },
        technology: {
            type: DataTypes.STRING,
        }

    })

    return skill
}