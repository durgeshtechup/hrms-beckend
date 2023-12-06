const db = require("../models")

// create main model
const User = db.user
const Role = db.role
const RoleModule = db.roleModule


//1. create user
const addUser = async (req, res) => {

    try {
        const user = await User.create(req.body)
        res.status(200).send({
            flag: true,
            outdata: { user },


        })
        // console.log(user)
        return;

    } catch (error) {
        res.status(500).send({
            flag: false,
            message: "Something went wrong",
            error
        })
        return;
    }



}

//2. get all user
const getAllUsers = async (req, res) => {
    try {
        let users = await User.findAll()
        res.status(200).send({
            flag: true,
            outdata: { users },
            totalRecord: users?.length

        })
        return;

    } catch (err) {
        res.status(501).send(err)
        return;
    }

}

//3. get one user
const getOneUser = async (req, res) => {
    let id = req.params.id
    try {
        let user = await User.findOne({ where: { userId: id } })
        // let role = await Role.findOne({ where: { roleId: user.roleId } })
        let outdata = {
            user,
            // roleNmae: role.roleName
        }
        res.status(200).send({
            flag: true,
            outdata: { ...outdata }
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

//4. update user details

const updateUser = async (req, res) => {
    let id = req.params.id
    const { employeCode, staffId, email, password, roleId, updatedBy, isActive } = req.body
    let info = {
        employeCode,
        staffId,
        email,
        // password,
        roleId,
        updatedBy,
        isActive
    }
    try {
        const user = await User.update(info, { where: { userId: id } })
        if (user == 1) {
            res.status(200).send({
                flag: true,
                message: "User details updated!"
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
            error
        })
        return;

    }
}

//5. delete user by id

const deleteUser = async (req, res) => {
    let id = req.params.id
    const { isActive, updatedBy } = req.body
    let info = {
        isActive,
        updatedBy
    }
    try {
        if (!updatedBy) {
            res.status(400).send({
                flag: false,

            })
            return;
        }
        const user = await User.update(info, { where: { userId: id } })
        if (user == 1) {
            if (isActive == "yes") {
                res.status(200).send({
                    flag: true,
                    // user,
                    message: "User details is recovered."
                })
                return;
            }
            if (isActive == "no") {
                res.status(200).send({
                    flag: true,
                    // user,
                    message: "User details is deleted."
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
        console.log(error)
        res.status(500).send({
            flag: false,
            error
        })
        return;
    }
}

//6. Login user
const userLogin = async (req, res) => {

    let { email, password } = req.body
    try {
        // let role = await Role.findOne({ where: { roleId: user.roleId } })
        if (!password || !email) {
            res.status(400).send({
                flag: false,
                message: "Please enter required feilds.",
                token: ""
            })
            return;
        }
        let user = await User.findOne({ where: { email } })

        if (!user) {
            res.status(200).send({
                flag: false,
                message: "Invalid email or password.",
                token: ""
            })
            return;

        }
        if (user.password == password) {
            let role = await Role.findOne({ where: { roleId: user.roleId } })
            let roleModule = await RoleModule.findAll({ where: { userId: user.userId } })
            user.password = undefined


            user.roleName = role.roleName
            res.status(200).send({
                flag: true,
                message: "Logged in successfully!",
                outdata: {
                    user,
                    roleName: role.roleName,
                    roleModule

                },
                token: ""
            })
            return;
        } else {
            res.status(200).send({
                flag: false,
                message: "Invalid email or password!",
                token: ""
            })
            return;

        }


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
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    userLogin
}