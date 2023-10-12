

module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define("staff", {
        staffId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        employeCode: {
            type: DataTypes.TEXT
        },
        candidateId: {
            type: DataTypes.INTEGER,

        },
        roleId: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.TEXT
        },
        gender: {
            type: DataTypes.TEXT
        },
        dateOfBirth: {
            type: DataTypes.DATE
        },
        fatherName: {
            type: DataTypes.TEXT
        },
        motherName: {
            type: DataTypes.TEXT
        },
        maidenName: {
            type: DataTypes.TEXT
        },
        marritalStatus: {
            type: DataTypes.TEXT
        },
        currentAddress: {
            type: DataTypes.TEXT
        },
        permanentAddress: {
            type: DataTypes.TEXT
        },
        // email: {
        //     type: DataTypes.TEXT

        // },


    })

    return Staff
}