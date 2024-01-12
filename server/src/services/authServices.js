// file for sending mails
require('dotenv').config();
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const {v4: uuidv4} = require('uuid');
const UserVerification = require('../models/UserVerification')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS
    }
})

transporter.verify((error, success) => {
    if (error) {
        console.log(error)
    }
    else{
        console.log('transporter is ready') 
    }
})



exports.sendVerificationEmail = async ({_id, email}, res, mailOptions, uniqueString) => {
    try{    
        let hashedString = await bcrypt.hash(uniqueString, 10)
        bcrypt.hash(uniqueString, 10)
        const newUserVerification = new UserVerification({
            userId: _id,
            uniqueString: hashedString,
            createdAt: Date.now(),
            expiredAt: Date.now() + 21600000
        })

        await newUserVerification.save()
        const info = await transporter.sendMail(mailOptions)
        console.log(`email sent: ${info.messageId}`)
        console.log('mail sent successfully')

    }catch(e){
        console.log(e)
        return res.status(500).json({msg: 'hash unique string <- error'})
    }
}