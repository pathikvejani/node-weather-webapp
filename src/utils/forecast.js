const request = require('request')

const API = '9449dddab3fbdc9b9503567dd22418ec'

// const forecast = (lat, long, callback) => {
const forecast = (address, callback) => {
    // const url = 'http://api.weatherstack.com/current?access_key=' + API + '&query=' + lat + ',' + long
    const url = 'http://api.weatherstack.com/current?access_key=' + API + '&query=' + address

    request({ url, json: true }, (error, { body }) => {
        // console.log(body);
        if (error) {
            callback("Unable to connect!", undefined)
        } else if (body.error) {
            callback("Unable to find locaiton", undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = forecast