const express = require("express")
const cors = require("cors")
// const fileUpload = require("express-fileupload")
const cloudinary = require("cloudinary")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const path = require("path")
// const multer = require('multer')

const app = express()

var corOptions = {
    origin: "https://localhost:8081"
}



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

app.use(cors(corOptions))
// app.use(bodyParser.text({ type: '/' }));
app.use(express.json())
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true }))

// app.use(express.urlencoded({ extended: true }))
// app.use(fileUpload({
//     useTempFiles: true
// }))

// app.use('/public/uploads', express.static('uploads'));
// app.use('/public', express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(morgan('dev'));


cloudinary.config({
    cloud_name: "dgiye4daz",
    api_key: "449121857626744",
    api_secret: "xzjwfM_K105S1wdd8e1PPOLoVX0"
});


//routers
const CandidateRouter = require("./routes/CandidateRouter")
const StaffRouter = require("./routes/StaffRouter")
const UserRouter = require("./routes/userRouter")

app.use("/api/candidate", CandidateRouter)
app.use("/api/staff", StaffRouter)
app.use("/api/user", UserRouter)

// testing api

// app.post('/api/test/fileUploads', upload.any(), (req, res) => {
//     res.json({ message: 'Hello' })

// })


const PORT = process.env.PORT || 8088

//server

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`)
})