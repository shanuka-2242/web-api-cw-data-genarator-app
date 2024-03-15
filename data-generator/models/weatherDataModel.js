const mongoose = require('mongoose')

const weatherInfoSchema = mongoose.Schema(
    {

        districtId: {
            type: String
        },
        districtName: {
            type: String
        },
        longtude: {
            type: String
        },
        latitude: {
            type: String
        },
        temprature: {
            type: String
        },
        humidity: {
            type: String
        },
        airpresure: {
            type: String,
            default: "29.3 in Hg"
        },
    },
    {
        timestamps : true
    }
)

const WeatherInfo = mongoose.model('WeatherInfo', weatherInfoSchema);

module.exports = WeatherInfo;