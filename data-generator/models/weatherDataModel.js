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
        airpressure: {
            type: String,
        },
    },
    {
        timestamps : true
    }
)

const WeatherInfoModel = mongoose.model('WeatherInfo', weatherInfoSchema);

module.exports = WeatherInfoModel;