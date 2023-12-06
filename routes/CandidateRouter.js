const candidateController = require("../controllers/candidateController")
const router = require("express").Router()

// multer settings for files upload
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./uploads/candidate`)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage })
const cpUpload = upload.fields([{ name: 'candidatePhoto', maxCount: 1 }, { name: 'resume', maxCount: 1 }, { name: 'others', maxCount: 5 }])



// api routes
// router.post("/addCandidate", candidateController.addCandidate)
router.post("/addCandidate", cpUpload, candidateController.addCandidate)
// router.post("/addCandidate", upload.single("candidatePhoto"), candidateController.addCandidate)
router.get("/allCandidates", candidateController.getAllCandidates)
router.get("/:id", candidateController.getOneCandidate)
router.put("/:id", candidateController.updateCandidate)
router.post("/:id", candidateController.deleteCandidate)


module.exports = router