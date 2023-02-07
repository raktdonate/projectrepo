const express=require('express')
const router=express.Router()
const authController=require('../controllers/auth')
const User=require('../model/user')
const adminController=require('../controllers/admin')

router.get('/adminlist',adminController.getList)

router.post('/permit',adminController.postPermit)

module.exports=router