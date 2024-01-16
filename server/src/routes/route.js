require('dotenv').config();
const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const authController = require('../controller/authController')
const authMiddleware = require('../middleware/authMiddleware')

//verification endpoint
router.get('/verify/:userId/:uniqueString', authController.verifyEmail)

//signup endoint
router.post('/signup', authController.signup)

//login endpoint
router.post('/login', authController.login)


router.post('/logout', authController.logout)
module.exports = router