const db = require("../models")

// create main model
const Role = db.role
// const Role = db.role


//2. get all skills
const getAllRoles = async (req, res) => {
    try {
        let roles = await Role.findAll()
        res.status(200).send({
            flag: true,
            outdata: { roles },
            totalRecord: roles?.length

        })
        return;

    } catch (err) {
        res.status(501).send(err)
        return;
    }

}

//3. get one skill
const getOneRole = async (req, res) => {
    let id = req.params.id
    try {
        let role = await Role.findOne({ where: { roleId: id } })
        // let outdata = {
        //     user,
        //     roleNmae: role.roleName
        // }
        res.status(200).send({
            flag: true,
            outdata: { role }
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
    getAllRoles,
    getOneRole,
    // updateSkill,
    // deleteUser,
}