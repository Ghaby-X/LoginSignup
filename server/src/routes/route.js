require('dotenv').config();
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {v4: uuidv4} = require('uuid');
const User = require('../models/User')
const UserVerification = require('../models/UserVerification')
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,16}$/;
const authController = require('../controller/authController')

//verification endpoint
router.get('/verify/:userId/:uniqueString', authController.verifyEmail)

/*async (req, res) =>{
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
*/
//signup endoint
router.post('/signup', authController.signup)

module.exports = router