const skillController = require("../controllers/skillController")


const router = require("express").Router()


// router.post("/addUser", skillController.addUser)
router.get("/allSkills", skillController.getAllSkills)
router.get("/:id", skillController.getOneSkill)
// router.put("/:id", skillController.updateUser)
// router.delete("/:id", skillController.deleteUser)


module.exports = router