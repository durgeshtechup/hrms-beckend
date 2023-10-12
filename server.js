const express = require("express")
const cors = require("cors")

const app = express()

var corOptions = {
    origin: "https://localhost:8081"
}



//middleware

app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

//routers
const CandidateRouter = require("./routes/CandidateRouter")
const StaffRouter = require("./routes/StaffRouter")
const UserRouter = require("./routes/userRouter")

app.use("/api/candidate", CandidateRouter)
app.use("/api/staff", StaffRouter)
app.use("/api/user", UserRouter)

// testing api

app.get('/', (req, res) => {
    res.json({ message: 'Hello' })

})


const PORT = process.env.PORT || 8088

//server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})