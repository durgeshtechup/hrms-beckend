const db = require("../models")

// create main model
const Skill = db.skill
// const Role = db.role


//2. get all skills
const getAllSkills = async (req, res) => {
    try {
        let skills = await Skill.findAll()
        res.status(200).send({
            flag: true,
            outdata: { skills },
            totalRecord: skills?.length

        })
        return;

    } catch (err) {
        res.status(501).send(err)
        return;
    }

}

//3. get one skill
const getOneSkill = async (req, res) => {
    let id = req.params.id
    try {
        let skill = await Skill.findOne({ where: { skillId: id } })
        // let outdata = {
        //     user,
        //     roleNmae: role.roleName
        // }
        res.status(200).send({
            flag: true,
            outdata: { skill }
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
    getAllSkills,
    getOneSkill,
    // updateSkill,
    // deleteUser,
}