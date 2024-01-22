const staffController = require("../controllers/staffController");

// multer settings for files upload
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/staff`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields([
  { name: "staffPhoto", maxCount: 1 },
  { name: "aadhar", maxCount: 1 },
  { name: "salarySlip", maxCount: 1 },
  { name: "experience", maxCount: 1 },
  { name: "marksheet", maxCount: 1 },
  { name: "cv", maxCount: 1 },
  { name: "addressProof", maxCount: 1 },
]);

const router = require("express").Router();

//apis routes
router.post("/addStaff", cpUpload, staffController.addStaff);
router.get("/allStaffs", staffController.getAllStaffs);
router.get("/:id", staffController.getOneStaff);
router.put("/:id", cpUpload, staffController.updateStaff);
router.post("/:id", staffController.deleteStaff);
router.get(
  "/anniversary/staff-work-anniversary",
  staffController.AniversaryStaff
);
router.get("/birthday/staff-birthday", staffController.BirthAniversaryStaff);

module.exports = router;
