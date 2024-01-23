const moduleController = require("../controllers/moduleController");

const router = require("express").Router();

router.get("/allModule", moduleController.getAllModules);

module.exports = router;
