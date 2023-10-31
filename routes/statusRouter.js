const statusController = require("../controllers/statusController.js")


const router = require("express").Router()


// router.post("/addUser", skillController.addUser)
router.get("/allStatus", statusController.getAllStatus)
router.get("/:id", statusController.getOneStatus)
// router.put("/:id", skillController.updateUser)
// router.delete("/:id", skillController.deleteUser)


module.exports = router