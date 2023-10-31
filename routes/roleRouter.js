const roleController = require("../controllers/roleController.js")


const router = require("express").Router()


// router.post("/addUser", skillController.addUser)
router.get("/allRoles", roleController.getAllRoles)
router.get("/:id", roleController.getOneRole)
// router.put("/:id", skillController.updateUser)
// router.delete("/:id", skillController.deleteUser)


module.exports = router