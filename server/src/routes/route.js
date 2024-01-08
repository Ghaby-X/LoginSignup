require('dotenv').config();
const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const {sendVerificationEmail} = require('../controller/mailer')

const User = require('../models/User')
const UserVerification = require('../models/UserVerification')


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,16}$/;

//verification endpoint
router.get('/verify/:userId/:uniqueString', (req, res) =>{
    let {userId, uniqueString} = req.params;
    console.log(userId)
    console.log(uniqueString)

    UserVerification.find({userId:userId})
    .then(result => {
        console.log(result)
        if(result.length > 0){
            // user verification record exist so we proceed 
            const {expiredAt} = result[0];
            const hashedUniqueString = result[0].uniqueString;

            //checking if the record is still valid
            if (expiredAt < Date.now()){
                UserVerification.deleteOne({userId})
                .then(result => {
                    User.deleteOne({_id: _id})
                    .then(() => {
                        return res.redirect(process.env.FRONTEND_URL + '/signup/expired')
                    })
                    .catch(error => {
                        console.log(error)
                        return res.status(500).json({msg: 'error occured while trying to delete expired User'})
                    })
                })
                .catch(error => {
                    return res.status(500).json({msg: 'An error occured while clearing userVerification'})
                })
            } else {
                //valid record exists
                //comparing the hashed unique string to string sent
                bcrypt.compare(uniqueString, hashedUniqueString)
                .then(result => {
                    if(result) {
                        User.updateOne({_id: userId}, {isVerified: true})
                        .then(() => {
                            UserVerification.deleteOne({userId})
                            .then(() => {
                                return res.status(201).json({msg: 'successfully signed up and verified'})
                                res.redirect(process.env.FRONTEND_URL + '/login/verified')
                            })
                            .catch(error => {

                            })
                        })
                        .catch(error => {
                            consoel.log(error)
                            return res.status(500).json({msg: '500: User was not updated'})
                        })

                    } else {
                        // existing record but incorrect
                        return res.status(400).json({msg: 'incorect url'})
                    }
                })
                .catch()
            }
        } else {
            return res.status(400).json({msg: 'account record doesnt exist or has been verified'})
        }
    })
    .catch(error => {
        console.log(error)
        return res.status(500).json({msg: "error occured checking for existing user"})
    })

})


router.post('/signup', async (req, res) => {
    let { email, password} = req.body;
    console.log(email)
    email = email.trim()
    password = password.trim()

    if (!email || !password) {
        return res.status(400).json({msg: "All fields are required"})
    }
    if(passwordRegex.test(password) == false){
        return res.status(400).json({msg: "Invalid credentials"})
    }
    //check if email is in database
    User.find({email}) 
    .then(async result => {
        console.log(result)
        if(result.length > 0) {
            return res.status(400).json({msg: 'email already registered'})
        }

        //email verification
        try {
            let hashedPassword = await bcrypt.hash(password, 10)
            let newUser = new User({
                email,
                password: hashedPassword,
                isVerified: false
            })

            newUser.save()
            .then(result => {
                sendVerificationEmail(result, res)
                console.log('User saved successfully')
            })
            .catch(e=> {
                console.log(e)
                return res.status(500).json({msg: "500: could not save user model"})
            })

            return res.status(201).json({msg: 'email sent successfully'})
        }
        catch(e) {
            console.log('Error sending email')
            console.log(e)
            return res.status(500).json({msg: 'couldnt send otp'})
        }

    })
    .catch(err => {
        return res.status(500).json({msg: 'server error'})
    })

})

module.exports = router