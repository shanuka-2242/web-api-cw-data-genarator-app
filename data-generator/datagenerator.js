const express = require('express')
const mongoose = require('mongoose')
const app = express()

// app.get("/api", (req, res) => {
//     res.json({"users": ["userOne", "userTwo", "userThree"]})
// })

mongoose.
connect('mongodb+srv://root:root@webapi.fgpmolr.mongodb.net/web-api-project?retryWrites=true&w=majority&appName=WEBAPI')
.then(() => {
    console.log('connected to MongaDB')
    app.listen(8000, () => {console.log("Server started on port 8000");})
}).catch((error) => {
    console.log(error)
})

function generateRandomTemperature() {
    const minTemperature = 16;
    const maxTemperature = 38;

    // Generate a random number between 0 and 1
    const random = Math.random();

    // Scale and shift the random number to fit the desired range
    const temperature = Math.floor(random * (maxTemperature - minTemperature + 1)) + minTemperature;

    return temperature;
}
