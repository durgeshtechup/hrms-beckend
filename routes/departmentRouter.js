const departmentController = require("../controllers/departmentController.js");

const router = require("express").Router();

router.get("/allDepartments", departmentController.getAllDepartments);

module.exports = router;
