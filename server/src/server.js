require('dotenv').config();
const express = require('express')
const cors = require('cors')

const userRoutes = require('./routes/route')

const PORT = process.env.PORT || 4000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use('/user', userRoutes)

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log(`Server listening on ${PORT}`);
})