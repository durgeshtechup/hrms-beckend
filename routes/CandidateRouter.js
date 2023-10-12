const candidateController = require("../controllers/candidateController")


const router = require("express").Router()


router.post("/addCandidate", candidateController.addCandidate)
router.get("/allCandidates", candidateController.getAllCandidates)
router.get("/:id", candidateController.getOneCandidate)
router.put("/:id", candidateController.updateCandidate)
router.delete("/:id", candidateController.deleteCandidate)


module.exports = router