const db = require("../models")

// create main model
const Status = db.status
// const Role = db.role


//1. create staff
// const addUser = async (req, res) => {
//     // let info = {
//     //     candidateId: req.body.candidateId,
//     //     applicationNumber: req.body.applicationNumber,
//     //     name: req.body.name,
//     //     Contact: req.body.Contact,
//     //     jobProfileId: req.body.jobProfileId,
//     //     currentCTC: req.body.currentCTC,
//     //     expectedCTC: req.body.expectedCTC,
//     //     location: req.body.location,
//     //     isRelocate: req.body.isRelocate,
//     //     reasonForJobChange: req.body.reasonForJobChange,
//     //     noticePeriod: req.body.noticePeriod,
//     //     experience: req.body.experience,
//     //     otherInfo: req.body.otherInfo,
//     // }
//     // console.log(info)
//     try {
//         const user = await User.create(req.body)
//         res.status(200).send({
//             flag: true,
//             user
//         })
//         console.log(user)


//     } catch (error) {
//         res.status(500).send({
//             flag: false,
//             message: "Something went wrong",
//             error
//         })
//     }



// }

//2. get all skills
const getAllStatus = async (req, res) => {
    try {
        let statuses = await Status.findAll()
        res.status(200).send({
            flag: true,
            outdata: { status: statuses },
            totalRecord: statuses?.length

        })
        return;

    } catch (err) {
        res.status(501).send(err)
        return;
    }

}

//3. get one skill
const getOneStatus = async (req, res) => {
    let id = req.params.id
    try {
        let status = await Status.findOne({ where: { statusId: id } })
        // let outdata = {
        //     user,
        //     roleNmae: role.roleName
        // }
        res.status(200).send({
            flag: true,
            outdata: { status }
        })
        return;
    } catch (error) {
        res.status(500).send({
            flag: false,
            message: "something went wrong!",
            error
        })
        return;

    }
}



module.exports = {
    // addUser,
    getAllStatus,
    getOneStatus,
    // updateSkill,
    // deleteUser,
}