const db = require("../models")

// create main model
const User = db.user

//1. create staff
const addUser = async (req, res) => {
    // let info = {
    //     candidateId: req.body.candidateId,
    //     applicationNumber: req.body.applicationNumber,
    //     name: req.body.name,
    //     Contact: req.body.Contact,
    //     jobProfileId: req.body.jobProfileId,
    //     currentCTC: req.body.currentCTC,
    //     expectedCTC: req.body.expectedCTC,
    //     location: req.body.location,
    //     isRelocate: req.body.isRelocate,
    //     reasonForJobChange: req.body.reasonForJobChange,
    //     noticePeriod: req.body.noticePeriod,
    //     experience: req.body.experience,
    //     otherInfo: req.body.otherInfo,
    // }
    // console.log(info)
    try {
        const user = await User.create(req.body)
        res.status(200).send({
            flag: true,
            user
        })
        console.log(user)


    } catch (error) {
        res.status(500).send({
            flag: false,
            message: "Something went wrong",
            error
        })
    }



}

//2. get all staffs
const getAllUsers = async (req, res) => {
    try {
        let users = await User.findAll()
        res.status(200).send({
            flag: true,
            users
        })

    } catch (err) {
        res.status(501).send(err)
    }

}

//3. get one staff
const getOneUser = async (req, res) => {
    let id = req.params.id
    try {
        let user = await User.findOne({ where: { id: id } })
        res.status(200).send({
            flag: true,
            user
        })
    } catch (error) {
        res.status(500).send({
            flag: false,
            message: "something went wrong!",
            error
        })

    }
}

//4. update staff details

const updateUser = async (req, res) => {
    let id = req.params.id
    try {
        const user = await User.update(req.body, { where: { id: id } })
        if (user == 1) {
            res.status(200).send({
                flag: true,
                message: "User details updated!"
            })
        } else {
            res.status(200).send({
                flag: false,
                message: "Something went wrong!"
            })
        }

    } catch (error) {
        res.status(500).send({
            flag: false,
            error
        })

    }
}

//5. delete staff by id

const deleteUser = async (req, res) => {
    let id = req.params.id
    try {
        await User.destroy({ where: { id: id } })
        res.status(200).send({
            flag: true,
            message: "Staff details is deleted."
        })
    } catch (error) {
        res.status(500).send({
            flag: false,
            error
        })
    }
}


module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
}