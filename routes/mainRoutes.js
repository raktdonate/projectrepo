const express=require('express')
const router=express.Router()
const mainController=require('../controllers/main')
const errorController=require('../controllers/error')

router.get('/',mainController.getIndex)

router.get('/donorcommunity',mainController.getDonorCommunity)

router.post('/joincommunity',mainController.postJoinCommunity)


module.exports=router