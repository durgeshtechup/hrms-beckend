const userController = require("../controllers/userController")


const router = require("express").Router()


router.post("/login", userController.userLogin)
router.post("/addUser", userController.addUser)
router.get("/allUser", userController.getAllUsers)
router.get("/:id", userController.getOneUser)
router.put("/:id", userController.updateUser)
router.post("/:id", userController.deleteUser)




module.exports = router