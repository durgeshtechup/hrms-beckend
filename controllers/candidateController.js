const db = require("../models")
var fs = require('fs');
// create main model
const Candidate = db.candidate
const CandidateSkill = db.candidateskills
const Candidatedocument = db.candidatedocument
const User = db.user
const RoleModule = db.roleModule
const Module = db.module


// main work

//1. create candidate
const addCandidate = async (req, res, next) => {
    let info = {
        // candidateId: req.body.candidateId,
        applicationNumber: req.body.applicationNumber,
        name: req.body.name,
        Contact: req.body.Contact,
        jobProfileId: req.body.jobProfileId,
        currentCTC: req.body.currentCTC,
        expectedCTC: req.body.expectedCTC,
        location: req.body.location,
        isRelocate: req.body.isRelocate,
        reasonForJobChange: req.body.reasonForJobChange,
        noticePeriod: req.body.noticePeriod,
        experience: req.body.experience,
        otherInfo: req.body.otherInfo,
    }


    try {
        const { candidatePhoto, resume, others } = req.files
        const { createdBy, name, Contact, rating, skillId } = req.body
        // console.log("Files", candidatePhoto[0]?.path)

        if (!name || !Contact || !resume || !createdBy) {
            if (candidatePhoto) {
                fs.unlink(candidatePhoto[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('candidatePhoto file deleted successfully');
                });
            }
            if (resume) {
                fs.unlink(resume[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('resume file deleted successfully');
                });
            }


            res.status(400).send({
                flag: false,
                message: "Please insert all required fields."
            })
            return false

        }
        const currentUser = await User.findOne({ where: { userId: createdBy } })
        if (!currentUser) {
            res.status(404).send({
                flag: false,
                message: "user not found"
            })
            return false

        }
        const currentUserRoleId = currentUser.roleId
        const allRoleModule = await RoleModule.findAll({ where: { roleId: currentUserRoleId } })
        // const module = await Module.findAll({ where: { moduleId: currentUserRoleId } })
        const isEditedModule = allRoleModule.filter((f) => f.isEdited == "yes" && f.moduleId == 8)
        const isEditedUsers = isEditedModule.filter(f => f.roleId == currentUserRoleId)
        console.log("isEditedUsers", isEditedUsers)
        if (isEditedUsers?.length == 0) {
            if (candidatePhoto) {
                fs.unlink(candidatePhoto[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('candidatePhoto file deleted successfully');
                });
            }
            if (resume) {
                fs.unlink(resume[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('resume file deleted successfully');
                });
            }
            res.status(200).send({
                flag: false,
                message: "You dont have right to add candidate."
            })
            return false
        }

        let allDocs = {}
        let candidateSkillsData = {}

        const candidate = await Candidate.create(req.body)
        if (candidate?.candidateId > 0) {
            candidateSkillsData.skills = await CandidateSkill.create({
                candidateId: candidate?.candidateId,
                rating,
                skillId,
                createdBy
            })
            if (candidatePhoto) {
                allDocs.candidatedocumentPhoto = await Candidatedocument.create({
                    candidateId: candidate?.candidateId,
                    fileType: "candidatePhoto",
                    docName: candidatePhoto[0]?.filename,
                    docPath: candidatePhoto[0]?.path,
                    createdBy
                })
            }
            if (resume) {
                allDocs.candidatedocumentResume = await Candidatedocument.create({
                    candidateId: candidate?.candidateId,
                    fileType: "candidateResume",
                    docName: resume[0]?.filename,
                    docPath: resume[0]?.path,
                    createdBy
                })
            }


            res.status(200).send({
                flag: true,
                outdata: {
                    candidate,
                    allDocs
                }

            })
        } else {
            if (candidatePhoto) {
                fs.unlink(candidatePhoto[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('candidatePhoto file deleted successfully');
                });
            }
            if (resume) {
                fs.unlink(resume[0]?.path, function (err) {
                    if (err) return console.log(err);
                    console.log('resume file deleted successfully');
                });
            }
            res.status(500).send({
                flag: false,
                message: "Something went wrong."
            })
            return false

        }
    } catch (error) {
        console.log("error", error)
        if (candidatePhoto) {
            fs.unlink(candidatePhoto[0]?.path, function (err) {
                if (err) return console.log(err);
                console.log('candidatePhoto file deleted successfully');
            });
        }

        if (resume) {
            fs.unlink(resume[0]?.path, function (err) {
                if (err) return console.log(err);
                console.log('resume file deleted successfully');
            });
        }

        res.status(500).send({
            flag: false,
            message: "Something went wrong",
            error
        })
    }


}
//2. get all candidates
const getAllCandidates = async (req, res) => {
    try {
        let candidates = await Candidate.findAll()
        // let candidateSkills = await CandidateSkill.findAll()
        // console.log("candidateSkills", candidateSkills)
        res.status(200).send({
            flag: true,
            outdata: { candidates },
            // candidateSkills
        })

    } catch (err) {
        res.status(501).send(err)
    }

}

//3. get one candidate
const getOneCandidate = async (req, res) => {
    let id = req.params.id
    try {
        let candidate = await Candidate.findOne({ where: { candidateId: id } })
        res.status(200).send({
            flag: true,
            outdata: { candidate }
        })
    } catch (error) {
        res.status(500).send({
            flag: false,
            message: "something went wrong!",
            error
        })

    }
}

//4. update candidate details

const updateCandidate = async (req, res) => {
    let id = req.params.id
    try {
        const candidate = await Candidate.update(req.body, { where: { candidateId: id } })
        if (candidate == 1) {
            res.status(200).send({
                flag: true,
                message: "Candidate details updated!"
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
            message: "Something went wrong!",
            error
        })

    }
}

//5. delete candidate by id

const deleteCandidate = async (req, res) => {
    let id = req.params.id
    try {
        await Candidate.destroy({ where: { candidateId: id } })
        res.status(200).send({
            flag: true,
            message: "Candidate details is deleted."
        })
    } catch (error) {
        res.status(500).send({
            flag: false,
            message: "Something went wrong!",
            error
        })
    }
}


module.exports = {
    addCandidate,
    getAllCandidates,
    getOneCandidate,
    updateCandidate,
    deleteCandidate,
}