

module.exports = (sequelize, DataTypes) => {
    const Module = sequelize.define("module", {
        moduleId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        moduleName: {
            type: DataTypes.STRING,
        }

    })
    return Module
}