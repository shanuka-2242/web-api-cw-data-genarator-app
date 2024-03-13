const express = require('express')
const mongoose = require('mongoose')
const app = express()

// app.get("/api", (req, res) => {
//     res.json({"users": ["userOne", "userTwo", "userThree"]})
// })

app.listen(8000, () => {console.log("Server started on port 8000");})

mongoose.
connect('mongodb+srv://root:root@webapi.fgpmolr.mongodb.net/web-api-project?retryWrites=true&w=majority&appName=WEBAPI')
.then(() => {
    console.log('connected to MongaDB')
}).catch((error) => {
    console.log(error)
})