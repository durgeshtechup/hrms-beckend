const db = require("../models")
var fs = require('fs');

// create main model
const Staff = db.staff
// const Candidate = db.candidate
const CandidateSkill = db.department
const Staffdocument = db.staffdocument
const User = db.user
const RoleModule = db.roleModule
const Module = db.module
//1. create staff
const addStaff = async (req, res) => {


    try {
        if (!req.body) {
            res.status(400).send({
                flag: false,
                message: "Please insert all required fields."
            })

            return;
        }
        const { staffPhoto, aadhar, salarySlip, experience, marksheet, cv, addressProof } = req?.files
        const {
            candidateId,
            employeCode,
            roleId,
            name,
            gender,
            dateOfBirth,
            fatherName,
            motherName,
            maidenName,
            marritalStatus,
            currentAddress,
            permanentAddress,
            email,
            mobile,
            emergencyContact,
            createdBy,
        } = req.body
        let info = {


            employeCode,
            candidateId,
            roleId,
            name,
            gender,
            dateOfBirth,
            fatherName,
            motherName,
            maidenName,
            marritalStatus,
            currentAddress,
            permanentAddress,
            email,
            mobile,
            emergencyContact,
            createdBy,

        }

        if (!name || !email || !mobile || !createdBy || !roleId || !employeCode
            // || !staffPhoto || !aadhar || !salarySlip || !experience || !marksheet || !cv || !addressProof
        ) {
            if (staffPhoto) {
                fs.unlink(staffPhoto[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('staffPhoto file deleted successfully');
                });
            }

            if (aadhar) {
                fs.unlink(aadhar[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('aadhar file deleted successfully');
                });
            }
            if (salarySlip) {
                fs.unlink(salarySlip[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('salarySlip file deleted successfully');
                });
            }
            if (experience) {
                fs.unlink(experience[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('experience file deleted successfully');
                });
            }
            if (marksheet) {
                fs.unlink(marksheet[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('marksheet file deleted successfully');
                });
            }
            if (cv) {
                fs.unlink(cv[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('cv file deleted successfully');
                });

            }
            if (addressProof) {
                fs.unlink(addressProof[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('addressProof file deleted successfully');
                });

            }

            res.send({
                flag: false,
                message: "Please insert all required fields."
            })
            return false

        }


        const currentUser = await User.findOne({ where: { userId: createdBy } })


        const currentUserRoleId = currentUser.roleId
        const allRoleModule = await RoleModule.findAll({ where: { roleId: currentUserRoleId } })
        // const module = await Module.findAll({ where: { moduleId: currentUserRoleId } })
        const isEditedModule = allRoleModule.filter((f) => f.isEdited == "yes" && f.moduleId == 1)
        const isEditedUsers = isEditedModule.filter(f => f.roleId == currentUserRoleId)
        console.log("isEditedUsers", isEditedUsers)
        if (isEditedUsers?.length == 0) {
            if (staffPhoto) {
                fs.unlink(staffPhoto[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('staffPhoto file deleted successfully');
                });
            }

            if (aadhar) {
                fs.unlink(aadhar[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('aadhar file deleted successfully');
                });
            }
            if (salarySlip) {
                fs.unlink(salarySlip[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('salarySlip file deleted successfully');
                });
            }
            if (experience) {
                fs.unlink(experience[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('experience file deleted successfully');
                });
            }
            if (marksheet) {
                fs.unlink(marksheet[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('marksheet file deleted successfully');
                });
            }
            if (cv) {
                fs.unlink(cv[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('cv file deleted successfully');
                });

            }
            if (addressProof) {
                fs.unlink(addressProof[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('addressProof file deleted successfully');
                });

            }


            res.status(200).send({
                flag: false,
                message: "You dont have right to add staff."
            })
            return false
        }

        let allDocs = {}
        const staff = await Staff.create(info)
        if (staff?.staffId > 0) {
            if (staffPhoto) {
                allDocs.staffdocumentPhoto = await Staffdocument.create({
                    staffId: staff?.staffId,
                    docType: "staffPhoto",
                    docName: staffPhoto[0]?.filename,
                    docPath: staffPhoto[0]?.path,
                    createdBy
                })
            }
            if (aadhar) {
                allDocs.staffdocumentAadhar = await Staffdocument.create({
                    staffId: staff?.staffId,
                    docType: "staffAadhar",
                    docName: aadhar[0]?.filename,
                    docPath: aadhar[0]?.path,
                    createdBy
                })
            }
            if (salarySlip) {
                allDocs.staffdocumentSalarySlip = await Staffdocument.create({
                    staffId: staff?.staffId,
                    docType: "staffSalarySlip",
                    docName: salarySlip[0]?.filename,
                    docPath: salarySlip[0]?.path,
                    createdBy
                })
            }
            if (experience) {
                allDocs.staffdocumentExperience = await Staffdocument.create({
                    staffId: staff?.staffId,
                    docType: "staffExperience",
                    docName: experience[0]?.filename,
                    docPath: experience[0]?.path,
                    createdBy
                })
            }
            if (marksheet) {
                allDocs.staffdocumentMarksheet = await Staffdocument.create({
                    staffId: staff?.staffId,
                    docType: "staffMarksheet",
                    docName: marksheet[0]?.filename,
                    docPath: marksheet[0]?.path,
                    createdBy
                })
            }
            if (cv) {
                allDocs.staffdocumentCv = await Staffdocument.create({
                    staffId: staff?.staffId,
                    docType: "staffCv",
                    docName: cv[0]?.filename,
                    docPath: cv[0]?.path,
                    createdBy
                })
            }

            if (addressProof) {
                allDocs.staffdocumentAddressProof = await Staffdocument.create({
                    staffId: staff?.staffId,
                    docType: "staffAddressProof",
                    docName: addressProof[0]?.filename,
                    docPath: addressProof[0]?.path,
                    createdBy
                })
            }


            res.status(200).send({
                flag: true,
                outdata: {
                    staff,
                    allDocs,
                }



            })
        } else {
            if (staffPhoto) {
                fs.unlink(staffPhoto[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('staffPhoto file deleted successfully');
                });
            }

            if (aadhar) {
                fs.unlink(aadhar[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('aadhar file deleted successfully');
                });
            }
            if (salarySlip) {
                fs.unlink(salarySlip[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('salarySlip file deleted successfully');
                });
            }
            if (experience) {
                fs.unlink(experience[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('experience file deleted successfully');
                });
            }
            if (marksheet) {
                fs.unlink(marksheet[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('marksheet file deleted successfully');
                });
            }
            if (cv) {
                fs.unlink(cv[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('cv file deleted successfully');
                });

            }
            if (addressProof) {
                fs.unlink(addressProof[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('addressProof file deleted successfully');
                });

            }

            res.status(500).send({
                flag: false,
                message: "Something went wrong."
            })
            return false

        }

        // const staff = await Staff.create(req.body)
        // res.status(200).send({
        //     flag: true,
        //     staff
        // })


    } catch (error) {
        console.log(error)
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
            outdata: staffs,
            totalRecord: staffs?.length

        })
        return;

    } catch (err) {
        res.status(501).send(err)
        return;
    }

}

//3. get one staff
const getOneStaff = async (req, res) => {
    let id = req.params.id
    try {
        let staff = await Staff.findOne({ where: { staffId: id } })
        let staffdocuments = await Staffdocument.findOne({ where: { staffId: id } })

        res.status(200).send({
            flag: true,
            outdata: { staff, staffdocuments }
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

//4. update staff details

const updateStaff = async (req, res) => {
    let id = req.params.id
    let {
        candidateId,
        employeCode,
        roleId,
        name,
        gender,
        dateOfBirth,
        fatherName,
        motherName,
        maidenName,
        marritalStatus,
        currentAddress,
        permanentAddress,
        email,
        mobile,
        emergencyContact,
        updatedBy,
    } = req.body
    let info = {
        candidateId,
        employeCode,
        roleId,
        name,
        gender,
        dateOfBirth,
        fatherName,
        motherName,
        maidenName,
        marritalStatus,
        currentAddress,
        permanentAddress,
        email,
        mobile,
        emergencyContact,
        updatedBy
    }
    try {
        const staff = await Staff.update(info, { where: { staffId: id } })
        console.log("Staff", staff)
        if (staff == 1) {
            res.status(200).send({
                flag: true,
                message: "Staff details updated!"
            })
            return;
        } else {
            res.status(200).send({
                flag: false,
                message: "Something went wrong!"
            })
            return;

        }

    } catch (error) {
        res.status(500).send({
            flag: false,
            message: "Something went wrong!",
            error
        })
        return;

    }
}

//5. delete staff by id

// const deleteStaff = async (req, res) => {
//     let id = req.params.id
//     try {
//         await Staff.destroy({ where: { staffId: id } })
//         res.status(200).send({
//             flag: true,
//             message: "Staff details is deleted."
//         })
//         return;
//     } catch (error) {
//         res.status(500).send({
//             flag: false,
//             message: "Something went wrong!",
//             error
//         })
//         return;
//     }
// }
const deleteStaff = async (req, res) => {
    let id = req.params.id
    const { isActive, updatedBy, candidateId } = req.body
    let info = {
        isActive,
        updatedBy,

    }

    try {
        if (!updatedBy) {
            res.status(400).send({
                flag: false,

            })
            return;
        }
        const staff = await Staff.update(info, { where: { staffId: id } })

        if (staff == 1) {
            if (isActive == "yes") {
                res.status(200).send({
                    flag: true,
                    // user,
                    message: "Candidate details is recovered."
                })
                return;
            }
            if (isActive == "no") {
                res.status(200).send({
                    flag: true,
                    // user,
                    message: "Candidate details is deleted."
                })
                return;
            }
            res.status(404).send({
                flag: false,
                message: "Something went wrong!"

            })
            return;


        } else {
            res.status(404).send({
                flag: false,
                message: "Something went wrong!"

            })
            return;
        }



    } catch (error) {
        res.status(500).send({
            flag: false,
            message: "Something went wrong!",
            error
        })
        return;

    }
}

module.exports = {
    addStaff,
    getAllStaffs,
    getOneStaff,
    updateStaff,
    deleteStaff,
}