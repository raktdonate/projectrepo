const express=require('express')
const router=express.Router()
const mainController=require('../controllers/main')
const errorController=require('../controllers/error')

router.get('/',mainController.getIndex)


module.exports=router