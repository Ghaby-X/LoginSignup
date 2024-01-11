require('dotenv').config();
const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const {sendVerificationEmail} = require('../controller/mailer')

const User = require('../models/User')
const UserVerification = require('../models/UserVerification')


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,16}$/;

//verification endpoint
router.get('/verify/:userId/:uniqueString', async (req, res) =>{
    let {userId, uniqueString} = req.params;
    try {
        let userFound = await UserVerification.find({userId:userId})
        if (userFound.length > 0){
            //user verification record exist so
            const {expiredAt} = userFound[0]
            const hashedUniqueString = userFound[0].uniqueString

            //checking if record is not expired
            if(expiredAt < Date.now()) {
                await UserVerification.deleteOne({userId})
                await User.deleteOne({_id: userId})
                return res.status(400).json({msg: 'LINK EXPIRED'})
            }else {
                //link is not expired, checking if it is valid
                const isMatch = await bcrypt.compare(uniqueString, hashedUniqueString)
                if (isMatch) {
                    await User.updateOne({_id: userId}, {isVerified: true})
                    await UserVerification.deleteOne({userId})
                    return res.status(201).json({msg: 'EMAIL VERIFIED'})
                }else {
                    return res.status(400).json({msg: 'BAD LINK'})
                }
            }
        }else{
            //check whether the user is already verified
            let user = await User.findOne({_id: userId})
            if(user.isVerified){
                return res.status(200).json({msg: 'User Already Verified'})

            }
            // Link is bad or not from use
            return res.status(400).json({msg: 'User not Found'})
        }
    }
    catch(e){
        console.log('server error')
        return res.status(500).json({msg: '500: INTERNAL SERVER ERROR'})
    }
})

//signup endoint
router.post('/signup', async (req, res) => {
    let { email, password} = req.body;
    email = email.trim()
    password = password.trim()

    if (!email || !password) {
        console.log("All fields are required")
        return res.status(400).json({msg: "All fields are required"})
    }
    if(passwordRegex.test(password) == false){
        console.log('password is not valid')
        return res.status(400).json({msg: "Invalid credentials"})
    }
    //check if email is in database
    try{
        let userFound = await User.find({email})
        //check if email already exist
        if(userFound.length > 0){
            return res.status(400).json({msg: 'email already registered'})
        }

        let hashedPassword = await bcrypt.hash(password, 10)
        let newUser = new User({
            email,
            password: hashedPassword,
            isVerified: false
        })
        let result = await newUser.save()
        sendVerificationEmail(result, res)
        console.log('User saved successfully')
        return res.status(201).json({msg: 'User saved successfully'})
    }
    catch(e){
        return res.status(500).json({msg: '500: INTERNAL SERVER ERROR'})
    }
   
})

module.exports = router