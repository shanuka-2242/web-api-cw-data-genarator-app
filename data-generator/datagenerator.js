const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())

//DB Connect
mongoose.connect('mongodb+srv://root:root@webapi.fgpmolr.mongodb.net/web-api-project?retryWrites=true&w=majority&appName=WEBAPI')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(8000, () => {console.log("Server started on port 8000");})
}).catch((error) => {
    console.log(error)
})

let districtList = [
    "Ampara|A001",
    "Badulla|B001"
]

//Insert data
app.post('/insertData', (req, res) => {

    //const districtId = "";
    //const districtName = "";

    //Looping trough district list
    districtList.forEach(district => {
        const splittedStrings = district.split('|');
        //districtId = splittedStrings[0]
        //districtName = splittedStrings[1]
    
        console.log(splittedStrings + Date.now);
    });

    console.log("inside post function");
    console.log(req.body);
    res.send(req.body)
})

function generateRandomTemperature() {
    const minTemperature = 16;
    const maxTemperature = 38;

    const random = Math.random();
    const temperature = Math.floor(random * (maxTemperature - minTemperature + 1)) + minTemperature;

    return temperature;
}

function generateRandomHumidity() {
    const minHumidity = 60;
    const maxHumidity = 90;

    const random = Math.random();
    const humidity = Math.floor(random * (maxHumidity - minHumidity + 1)) + minHumidity ;

    return humidity;
}