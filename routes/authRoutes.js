const express=require('express')
const router=express.Router()
const authController=require('../controllers/auth')

router.get('/login',authController.getLogin)

router.post('/login',authController.postLogin)

router.get('/logout',authController.postLogout)

router.get('/signup',authController.getSignup)

module.exports=router