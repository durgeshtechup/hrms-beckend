const express = require("express");
const cors = require("cors");
// const fileUpload = require("express-fileupload")
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

var corsOptions = {
  origin: [
    "http://localhost:61775",
    "http://localhost:3000",
    "http://localhost:53748",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//middleware
// const __dirname = path.resolve();

// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.use(express.static(`${__dirname} /uploads`));

// var storage = multer.diskStorage({
//     dest: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + '.png')
//     }
// })
// const upload = multer({ storage: storage });

app.use(cors());
// app.use(bodyParser.text({ type: '/' }));
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.urlencoded({ extended: true }))
// app.use(fileUpload({
//     useTempFiles: true
// }))

app.use("/uploads", express.static("uploads"));
// app.use('/public', express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(morgan('dev'));

// cloudinary.config({
//     cloud_name: "dgiye4daz",
//     api_key: "449121857626744",
//     api_secret: "xzjwfM_K105S1wdd8e1PPOLoVX0"
// });

const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.headers[tokenHeaderKey];

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return next();
    } else {
      // Access Denied
      return res.status(401).send({
        flag: false,
        message: "Access Denied",
      });
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send({
      flag: false,
      message: "Access Denied",
    });
  }
};

//routers
const CandidateRouter = require("./routes/CandidateRouter");
const StaffRouter = require("./routes/StaffRouter");
const UserRouter = require("./routes/userRouter");
const UserLogin = require("./routes/userLogin");
const SkillRouter = require("./routes/skillRouter.js");
const RoleRouter = require("./routes/roleRouter.js");
const StatusRouter = require("./routes/statusRouter.js");
const RoleModuleRouter = require("./routes/roleModuleRouter.js");
const ModuleRouter = require("./routes/moduleRouter");
const DepartmentRouter = require("./routes/departmentRouter.js");

app.use("/api/candidate", verifyToken, CandidateRouter);
app.use("/api/staff", verifyToken, StaffRouter);
app.use("/api/user", UserLogin);
app.use("/api/user", verifyToken, UserRouter);
app.use("/api/skill", verifyToken, SkillRouter);
app.use("/api/role", verifyToken, RoleRouter);
app.use("/api/status", verifyToken, StatusRouter);
app.use("/api/roleModule", verifyToken, RoleModuleRouter);
app.use("/api/module", verifyToken, ModuleRouter);
app.use("/api/department", verifyToken, DepartmentRouter);

// testing api

// app.post('/api/test/fileUploads', upload.any(), (req, res) => {
//     res.json({ message: 'Hello' })

// })

// const PORT = process.env.PORT || 8088

//server
// const PORT = require("./config/config.env")
// console.log("PORT", PORT.PORT)
const dotenv = require("dotenv");
//Config
dotenv.config({ path: "./config/config.env" });
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
