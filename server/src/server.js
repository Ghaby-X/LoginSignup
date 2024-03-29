require('dotenv').config();
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('./config/passport')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/route')

const PORT = process.env.PORT || 4000
const app = express()

app.use(cors( {
    origin: ['http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200
  }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, sameSite: 'strict' }
}))


app.use(passport.initialize())
app.use(passport.session())

app.use('/user', userRoutes)

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log(`Server listening on ${PORT}`);
})