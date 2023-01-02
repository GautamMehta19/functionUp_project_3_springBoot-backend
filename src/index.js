const expres = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const route = require("./routes/route.js")

const app = expres()

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://gautam:gautam123@cluster0.xorxp.mongodb.net/functionUp_project_3_springBoot", {

})
    .then(res => console.log("MongoDB is connected"))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3000, () => {
    console.log('Port is running on port no. ', process.env.PORT || 3000)
})