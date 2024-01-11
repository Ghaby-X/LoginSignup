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

async function forwardmail(obj) {
    let {toEmail, subject, html} = obj
    const mailOptions = {
        from: process.env.AUTH_USER,
        to: toEmail,
        subject: subject,
        html: html
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`email sent: ${info.messageId}`)
}

const sendVerificationEmail = ({_id, email}, res) => {
    const uniqueString = uuidv4() + _id
    let obj = {
        toEmail: email,
        subject: 'OTP-emailVerification',
        html: `<p>Verify your email address to complete the signup and login into your account</p><p>This link <b>expires in 6 hours</b></p><p>Press <a href=${process.env.FRONTEND_URL + '/mailverification/' + _id + '/' + uniqueString}>here</a> to proceed</p>`
    }

    //hash uniqueString
    bcrypt.hash(uniqueString, 10)
    .then(hashedUniqueString => {
        const newUserVerification = new UserVerification({
            userId: _id,
            uniqueString: hashedUniqueString,
            createdAt: Date.now(),
            expiredAt: Date.now() + 21600000
        })

        newUserVerification.save()
        .then( () => {
            forwardmail(obj)
            console.log('mail sent successfully')
        })
        .catch(e => {
            console.log(e)
            return res.status(500).json({msg: 'could not save userVerification'})
        }
        )
    })
    .catch(e => {
        console.log(e)
        return res.status(500).json({msg: 'hash unique string <- error'})
    })
}

module.exports = {sendVerificationEmail, forwardmail}