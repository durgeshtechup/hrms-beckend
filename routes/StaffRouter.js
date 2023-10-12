const staffController = require("../controllers/staffController")


const router = require("express").Router()


router.post("/addStaff", staffController.addStaff)
router.get("/allStaffs", staffController.getAllStaffs)
router.get("/:id", staffController.getOneStaff)
router.put("/:id", staffController.updateStaff)
router.delete("/:id", staffController.deleteStaff)


module.exports = router