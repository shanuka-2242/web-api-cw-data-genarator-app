const express = require('express')
const mongoose = require('mongoose')
const app = express()
const WeatherInfoModel = require('./models/weatherDataModel')
app.use(express.json())

//District static info list
let districtList = [
    "A01|Ampara|81.6643|7.2965",
    "A02|Anuradhapura|80.3822|8.3114",
    "B03|Badulla|81.0587|6.9924",
    "B04|Batticaloa|81.6983|7.7355",
    "C05|Colombo|79.8612|6.9271",
    "G06|Galle|80.2170|6.0535",
    "G07|Gampaha|79.9930|7.0873",
    "H08|Hambantota|81.1185|6.1240",
    "J09|Jaffna|80.0055|9.6612",
    "K10|Kalutara|79.9647|6.5794",
    "K11|Kandy|80.6350|7.2906",
    "K12|Kegalle|80.3466|7.2525",
    "K13|Kilinochchi|80.4000|9.3833",
    "K14|Kurunegala|80.3659|7.4860",
    "M15|Mannar|79.8455|8.9764",
    "M16|Matale|80.6248|7.4675",
    "M17|Matara|80.5353|5.9545",
    "M18|Monaragala|81.0060|6.8871",
    "M19|Mullaitivu|80.7174|9.2677",
    "N20|Nuwara Eliya|80.7821|6.9497",
    "P21|Polonnaruwa|81.0055|7.9403",
    "P22|Puttalam|79.8287|8.0390",
    "R23|Ratnapura|80.4747|6.7055",
    "T24|Trincomalee|81.2152|8.5879",
    "V25|Vavuniya|80.4971|8.7544"
]

//DB Connect
mongoose.connect('mongodb+srv://root:root@webapi.fgpmolr.mongodb.net/web-api-project?retryWrites=true&w=majority&appName=WEBAPI')
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(1000, () => { console.log("Server started on port 1000"); })
    }).catch((error) => {
        console.log(error)
    })

//Insert data using function which runs every 5 minutes
setInterval(createOrUpdateWeatherInfo, 5 * 1 * 1000);

async function createOrUpdateWeatherInfo() {
    try {
        districtList.forEach(async district => {
            const now = new Date();
            const formattedDate = now.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });

            const splittedStrings = district.split('|');
            // const IsAvailableWeatherInfo = await WeatherInfoModel.findOne({districtId: splittedStrings[0]});

            // if(IsAvailableWeatherInfo){
            //     console.log(formattedDate.replace(',', '') + " : " + "Weather info available under district ID " + IsAvailableWeatherInfo.districtId);

            //     IsAvailableWeatherInfo.temprature = generateRandomTemperature() + "°C";
            //     IsAvailableWeatherInfo.humidity = generateRandomHumidity() + "%";
            //     IsAvailableWeatherInfo.airpressure = generateRandomAirPressure() + "hPa";
            //     await IsAvailableWeatherInfo.save();

            //     console.log(formattedDate.replace(',', '') + " : " + IsAvailableWeatherInfo.districtId + ", " + IsAvailableWeatherInfo.districtName + " district info updated.");
            // }
            // else{

            //     const newWeatherInfo = new WeatherInfoModel({           

            //         districtId: splittedStrings[0],
            //         districtName: splittedStrings[1],
            //         longtude: splittedStrings[2],
            //         latitude: splittedStrings[3],
            //         temprature: generateRandomTemperature() + "°C",
            //         humidity: generateRandomHumidity() + "%",
            //         airpressure: generateRandomAirPressure() + "hPa"

            //     });
            //     await newWeatherInfo.save();
            //     console.log(splittedStrings[0] + ", " + splittedStrings[1] + " district info newly added.");
            // } 

            const id = splittedStrings[0]; // Replace with the actual district id
            const updatedWeatherInfoValues = {
                districtId: splittedStrings[0],
                districtName: splittedStrings[1],
                longtude: splittedStrings[2],
                latitude: splittedStrings[3],
                temprature: generateRandomTemperature() + "°C",
                humidity: generateRandomHumidity() + "%",
                airpressure: generateRandomAirPressure() + "hPa"
            };

            updateWeatherInfo(id, updatedWeatherInfoValues);

        });
        console.error('___________________________________________________');
    } catch (error) {
        console.error('Error inserting data:', error.message);
    }
}

//http://localhost:5000/weatherInfo
//https://web-api-cw-server-app.onrender.com/weatherInfo
const updateWeatherInfo = async (id, updatedWeatherInfoValues) => {
    const url = `http://localhost:5000/updateWeatherInfo/${id}`;

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedWeatherInfoValues)
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error('There was a problem with the POST request:', error);
    }
};

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
    const humidity = Math.floor(random * (maxHumidity - minHumidity + 1)) + minHumidity;

    return humidity;
}

function generateRandomAirPressure() {
    const minAirPressure = 990;
    const maxAirPressure = 1020;

    const random = Math.random();
    const airPressure = Math.floor(random * (maxAirPressure - minAirPressure + 1)) + minAirPressure;

    return airPressure;
}