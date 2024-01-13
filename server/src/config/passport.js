const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const mongoose = require('./db')
const User = require('../models/User')

//use LocalStrategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async function verify(email, password, cb) {
    try{
        let user = await User.findOne({email: email})
        if (!user) {throw new Error('Email not registered')}
        if (!user?.isVerified) {return cb(null, false, {msg: 'User not verified'})}

        const isMatch = bcrypt.compare(password, user?.password)
        if(!isMatch) {return cb(null, false, {msg: 'Incorrect password'})}

        return cb(null, user)
    }  
    catch(e) {
        return cb(err);
    } 
}))

//serialize User
passport.serializeUser((user, done) => {
    process.nextTick(() => {
        return done(null, {
            id: user._id
        })
    })
})

//deserialize User
passport.deserializeUser((user, done) => {
    process.nextTick(() => {
        return done(null, user)
    })
})

module.exports = passport;