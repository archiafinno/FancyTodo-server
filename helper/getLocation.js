const axios = require('axios')

function getLocation(req, res, next) {
        return axios.get('https://api.ipify.org?format=json')
    .then(response => {
        console.log(`respon ipify`)
        console.log(response.data)
        // console.log(response.data)
        return axios.get(`https://ipapi.co/${response.data.ip}/json`)
        
    })
    .then(response => {
        console.log(`respon ipstack`)
        console.log(response.data)
        let lat = response.data.latitude
        let lon = response.data.longitude
        req.locData= {lat, lon}
        return next()
    })
    .catch(err => {
        console.log("ERROR FETCHING GEOLOCATION");
        next(err)
    })

}

module.exports = { getLocation }
