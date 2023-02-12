const express=require('express')
const router=express.Router()
const mainController=require('../controllers/main')
const errorController=require('../controllers/error')
// const isAuth = require('../middleware/isAuth')

router.get('/',mainController.getIndex)

router.get('/about',mainController.getAbout)

router.get('/donorcommunity',mainController.getDonorCommunity)

router.get('/ngocommunity',mainController.getNgoCommunity)

router.post('/joincommunity',mainController.postJoinCommunity)

router.get('/joincommunity',mainController.getJoinCommunity)

router.post('/search',mainController.postSearch)

router.get('/profile',mainController.getProfile);

router.get('/donate',mainController.getDonate)

router.post('/editprofile',mainController.postChanges)

router.get('/chatpage/:userToChat',mainController.getChatPage)

router.post('/reviewForm',mainController.postReview)
router.post('/searchdonate',mainController.postDonate)

router.get('/sendmail/:userId',mainController.getSendMail)

router.post('/sendmail',mainController.postMail)

module.exports=router