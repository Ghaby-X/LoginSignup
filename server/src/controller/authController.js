const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');
const authService = require('../services/authServices')
const User = require('../models/User');
const UserVerification = require('../models/UserVerification')


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,16}$/;

exports.signup = asyncHandler(async (req, res, next) => {
    let { email, password} = req.body;
    email = email.trim()
    password = password.trim()

    if (!email || !password) {
        return res.status(400).json({msg: "All fields are required"})
    }
    if(passwordRegex.test(password) == false){
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
       const  {_id} = result

       const uniqueString = uuidv4() + result._id
       const mailOptions = {
           from: process.env.AUTH_USER,
           to: result.email,
           subject: 'OTP-emailVerification',
           html: `<p>Verify your email address to complete the signup and login into your account</p><p>This link <b>expires in 6 hours</b></p><p>Press <a href=${process.env.FRONTEND_URL + '/mailverification/' + _id + '/' + uniqueString}>here</a> to proceed</p>`
       }
        
        authService.sendVerificationEmail(result, res, mailOptions, uniqueString)
        return res.status(201).json({msg: 'User saved successfully'})
    }
    catch(e){
        return res.status(500).json({msg: '500: INTERNAL SERVER ERROR'})
    }
})

exports.verifyEmail = asyncHandler(async (req, res, next) => {
    const {userId, uniqueString} = req.params;
    try {
        let userFound = await UserVerification.findOne({userId:userId})

        if (userFound){
            if(userFound?.expiredAt < Date.now()) {
                await UserVerification.deleteOne({userId})
                await User.deleteOne({_id: userId})
                return res.status(400).json({msg: 'LINK EXPIRED'})
            }else {
                //link is not expired, checking if it is valid
                const isMatch = bcrypt.compare(uniqueString, userFound?.uniqueString)
                if (isMatch) {
                    await User.updateOne({_id: userId}, {isVerified: true})
                    await UserVerification.deleteOne({userId})
                    return res.status(201).json({msg: 'EMAIL VERIFIED'})
                }else {
                    return res.status(400).json({msg: 'BAD LINK'})
                }
            }
        }else {
            let user;

            user= await User.findOne({_id: userId})            
            console.log(user)
            if(user?.isVerified) return res.status(200).json({msg: 'User Already Verified'});
            return res.status(401).json({msg: 'User not Found'});
        }
    }
    catch(e){
        console.log('server error')
        console.log(e)
        return res.status(500).json({msg: '500: INTERNAL SERVER ERROR'})
    }
})

exports.login = asyncHandler(async (req, res) => {
    try{
        return res.json({msg: 'successfully signed in'})
    }
    catch(e) {
        return res.json({msg: 'not logged in'})
    }
    
})

exports.logout = asyncHandler(async (req, res) => {
    req.logout(function(err) {
        if(err) {return next(err)}
        return res.status(200).json({msg: 'Logged Out successfully'})
    })
})