const axios = require('axios')

function getWeather(req, res, next) {
    return axios.get(`https://api.weatherbit.io/v2.0/current?lat=${req.locData.lat}&lon=${req.locData.lon}&key=${process.env.APIKEY_WEATHERBIT}`)
    .then(response => {
        // console.log(`ini respon weather bit`)
        // console.log(response)
        // console.log(response.data.data[0])
        let data = response.data.data[0]
        // console.log(data)
        // console.log(req.lon, req.lat)
        req.weatherData = data
        return next()

    }) 
    .catch(err => {
        console.log("ERROR FETCHING WEATHER");
        next(err)
    })

}

module.exports = { getWeather }