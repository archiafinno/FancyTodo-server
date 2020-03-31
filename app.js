require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const router = require('./router/index.js')
const errorHandler = require('./middlewares/errorHandler.js')

app.use(express.json())
app.use('/', router)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`)
})