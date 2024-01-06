require('dotenv').config();
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors)


app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log(`Server listening on ${PORT}`);
})