const db = require("../models")

// create main model
const RoleModule = db.roleModule
const Module = db.module
// const Role = db.role
//2. get all skills
const addRoleModule = async (req, res) => {
    const inputData = req.body
    const checkUserId = inputData[0]?.userId
    const isUserIdSame = inputData.every(e => e.userId == checkUserId)
    const IsroleModuleIdExist = inputData.every(e => e.roleModuleId == 0)

    let isRecordExist = ""
    try {

        // console.log("isUserIdSame", isUserIdSame)
        const modules = await Module.findAll()


        if (inputData.length == modules.length && IsroleModuleIdExist) {


            if (isUserIdSame) {
                const IsroleModuleId = await RoleModule.findOne({ where: { userId: checkUserId } })
                if (IsroleModuleId?.roleModuleId > 0) {
                    res.status(200).send({
                        flag: false,
                        message: "Record Exist!",
                    })
                    return;
                } else {

                    await inputData.forEach(async (data) => {

                        await RoleModule.create(data)
                    })
                    res.status(200).send({
                        flag: true,
                        message: "Rights have been given successfuly!"
                    })
                    return;
                }


            } else {
                res.status(400).send({
                    flag: false,
                    message: "something went wrong!",

                    // message: "Rights has been given successfuly!"
                })
                return;
            }




        } else {
            res.status(400).send({
                flag: false,
                // message: "Rights has been given successfuly!"
            })
            return;
        }
    } catch (error) {
        console.log("error:", error)
        res.status(500).send({
            flag: false,
            message: "something went wrong!",
            error
        })
        return;
    }
}

const getAllRoleModule = async (req, res) => {
    try {
        let roleModules = await RoleModule.findAll()
        res.status(200).send({
            flag: true,
            outdata: { roleModules },
            totalRecord: roleModules?.length
        })
        return;
    } catch (err) {
        res.status(501).send(err)
        return;
    }
}
const getAllRoleModuleByUserId = async (req, res) => {
    const userId = req.query.userId
    try {
        // let roleModules = await RoleModule.find()
        let roleModules = await RoleModule.findAll({ where: { userId } })
        res.status(200).send({
            flag: true,
            outdata: { roleModules },
            totalRecord: roleModules?.length

        })
        return;

    } catch (err) {
        res.status(501).send(err)
        return;
    }

}


//3. get one skill
const getOneRoleModule = async (req, res) => {
    let id = req.params.id
    try {
        let roleModule = await RoleModule.findOne({ where: { roleModuleId: id } })
        // let outdata = {
        //     user,
        //     roleNmae: role.roleName
        // }
        res.status(200).send({
            flag: true,
            outdata: { roleModule }
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

const updateRoleModule = async (req, res) => {
    const inputData = req.body
    const checkUserId = inputData[0]?.userId
    const isUserIdSame = inputData.every(e => e.userId == checkUserId)
    const IsroleModuleIdExist = inputData.every(e => e.roleModuleId != 0)

    let isRecordExist = ""
    try {

        // console.log("isUserIdSame", isUserIdSame)
        const modules = await Module.findAll()


        if (inputData.length == modules.length && IsroleModuleIdExist) {


            if (isUserIdSame) {
                // const IsroleModuleId = await RoleModule.findOne({ where: { userId: checkUserId } })
                // if (IsroleModuleId?.roleModuleId > 0) {
                if (false) {
                    res.status(200).send({
                        flag: false,
                        message: "Record Exist!",
                    })
                    return;
                } else {

                    await inputData.forEach(async (data) => {

                        await RoleModule.update(
                            {
                                isViewed: data?.isViewed,
                                isEdited: data?.isEdited,
                                updatedBy: data?.updatedBy
                            },
                            { where: { roleModuleId: data?.roleModuleId, userId: data?.userId, moduleId: data?.moduleId } })
                    })
                    res.status(200).send({
                        flag: true,
                        message: "Rights have been updated successfuly!"
                    })
                    return;
                }


            } else {
                res.status(400).send({
                    flag: false,
                    message: "something went wrong!",

                    // message: "Rights has been given successfuly!"
                })
                return;
            }




        } else {
            res.status(400).send({
                flag: false,
                // message: "Rights has been given successfuly!"
            })
            return;
        }
    } catch (error) {
        console.log("error:", error)
        res.status(500).send({
            flag: false,
            message: "something went wrong!",
            error
        })
        return;
    }
}



module.exports = {
    addRoleModule,
    getAllRoleModuleByUserId,
    getAllRoleModule,
    getOneRoleModule,
    updateRoleModule
    // updateSkill,
    // deleteUser,
}