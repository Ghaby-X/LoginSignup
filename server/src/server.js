require('dotenv').config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/route')

const PORT = process.env.PORT || 4000

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use('/user', userRoutes)

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log(`Server listening on ${PORT}`);
})