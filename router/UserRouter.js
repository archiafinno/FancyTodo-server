const router = require('express').Router()
const UserController = require('../controller/UserController.js')
const authentication = require('../middlewares/authentication.js')
const { getLocation } = require('../helper/getLocation')
const { getWeather } = require('../helper/getWeather')

router.get('/', authentication, getLocation, getWeather, UserController.read)
    // console.log(`masuk ke routingan user`)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)

module.exports = router