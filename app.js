const express = require('express')
const app = express()
const PORT = 3000
const router = require('./router/index.js')

app.use(express.json())
app.use('/', router)

app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`)
})