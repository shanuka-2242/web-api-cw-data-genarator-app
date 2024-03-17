const express = require('express')
const app = express()
const mongoose = require('mongoose')
const WeatherInfoModel = require('./models/weatherDataModel')

app.use(express.json())

//DB Connect
mongoose.connect('mongodb+srv://root:root@webapi.fgpmolr.mongodb.net/web-api-project?retryWrites=true&w=majority&appName=WEBAPI')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(5000, () => {console.log("Server started on port 5000");})
}).catch((error) => {
    console.log(error)
})

app.get("/weatherInfo", async (req, res) => {
    try {
        const weatherinfos = await WeatherInfoModel.find();
        res.json(weatherinfos);
        console.log(weatherinfos);
        res.send(weatherinfos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});