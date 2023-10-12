const db = require("../models")

// create main model
const Staff = db.staff

//1. create staff
const addStaff = async (req, res) => {
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
        const staff = await Staff.create(req.body)
        res.status(200).send({
            flag: true,
            staff
        })
        console.log(staff)


    } catch (error) {
        res.status(500).send({
            flag: false,
            message: "Something went wrong",
            error
        })
    }



}

//2. get all staffs
const getAllStaffs = async (req, res) => {
    try {
        let staffs = await Staff.findAll()
        res.status(200).send({
            flag: true,
            staffs
        })

    } catch (err) {
        res.status(501).send(err)
    }

}

//3. get one staff
const getOneStaff = async (req, res) => {
    let id = req.params.id
    try {
        let staff = await Staff.findOne({ where: { id: id } })
        res.status(200).send({
            flag: true,
            staff
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

const updateStaff = async (req, res) => {
    let id = req.params.id
    try {
        const staff = await Staff.update(req.body, { where: { id: id } })
        if (staff == 1) {
            res.status(200).send({
                flag: true,
                message: "Staff details updated!"
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

const deleteStaff = async (req, res) => {
    let id = req.params.id
    try {
        await Staff.destroy({ where: { id: id } })
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
    addStaff,
    getAllStaffs,
    getOneStaff,
    updateStaff,
    deleteStaff,
}