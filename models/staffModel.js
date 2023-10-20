

module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define("staff", {
        staffId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        employeCode: {
            type: DataTypes.STRING
        },
        candidateId: {
            type: DataTypes.INTEGER,

        },
        roleId: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },
        dateOfBirth: {
            type: DataTypes.DATE
        },
        fatherName: {
            type: DataTypes.STRING
        },
        motherName: {
            type: DataTypes.STRING
        },
        maidenName: {
            type: DataTypes.STRING
        },
        marritalStatus: {
            type: DataTypes.STRING
        },
        currentAddress: {
            type: DataTypes.STRING
        },
        permanentAddress: {
            type: DataTypes.STRING
        },
        // email: {
        //     type: DataTypes.STRING,
        //     unique: true

        // },
        // createdBy: {
        //     type: DataTypes.INTEGER
        // }
        // ,
        // updatedBy: {
        //     type: DataTypes.INTEGER
        // }


    })

    return Staff
}