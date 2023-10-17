

module.exports = (sequelize, DataTypes) => {
    const Candidate = sequelize.define("candidate", {
        candidateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        applicationNumber: {
            type: DataTypes.TEXT
        },
        name: {
            type: DataTypes.TEXT,

        },
        Contact: {
            type: DataTypes.TEXT
        },
        jobProfileId: {
            type: DataTypes.INTEGER
        },
        currentCTC: {
            type: DataTypes.TEXT
        },
        expectedCTC: {
            type: DataTypes.TEXT
        },
        location: {
            type: DataTypes.TEXT
        },
        isRelocate: {
            type: DataTypes.TEXT
        },
        reasonForJobChange: {
            type: DataTypes.TEXT
        },
        noticePeriod: {
            type: DataTypes.TEXT
        },
        experience: {
            type: DataTypes.TEXT
        },
        otherInfo: {
            type: DataTypes.TEXT
        },
        // email: {
        //     type: DataTypes.TEXT

        // },
        // createdBy: {
        //     type: DataTypes.INTEGER
        // }
        // ,
        // updatedBy: {
        //     type: DataTypes.INTEGER
        // }


    })

    return Candidate
}