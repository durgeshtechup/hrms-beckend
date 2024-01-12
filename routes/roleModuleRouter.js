const roleModuleController = require("../controllers/roleModuleController");

const router = require("express").Router();

router.post("/addRoleModule", roleModuleController.addRoleModule);
router.get("/allRoleModules", roleModuleController.getAllRoleModule);
router.get(
  "/getAllRoleModuleByUserId",
  roleModuleController.getAllRoleModuleByUserId
);

router.get("/getById/:id", roleModuleController.getOneRoleModule);
router.put("/updateRoleModule", roleModuleController.updateRoleModule);

// router.delete("/:id", skillController.deleteUser)

module.exports = router;
