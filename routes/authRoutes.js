const express=require('express')
const router=express.Router()
const authController=require('../controllers/auth')
const User=require('../model/user')

const {body}=require('express-validator/check');

router.get('/login',authController.getLogin)

router.post('/login',
            [
                body('email','Incorrect email')
                .isEmail(),
                
                 body('password','password has to be valid')
                 .isLength({min:5})
                 .trim()
            ]
            ,authController.postLogin)

router.get('/logout',authController.postLogout)

router.get('/signup',authController.getSignupMain)

router.get('/usersignup',authController.getSignupUser)

router.get('/ngosignup',authController.getSignupNgo)

router.post('/signupuser',
    [
        body('username','username should of minimum length 5')
            .isLength({min:5}),
        body('email')
            .isEmail()
            .withMessage('please enter a valid email')
            .custom((value,{req})=>{
                return User.findOne({email:value}).then(user=>{
                    if(user){
                        return Promise.reject(  //asynchronous
                            'email exists already,Please pick a different one'
                        )
                    }
                })
            }),
        body('password','Password has to be valid')
            .isLength({min:5})
            .trim()
    ]
    ,authController.postSignupUser)

router.post('/signupngo',authController.postSignupNgo)

// router.get('/message')

router.get('/reset',authController.getReset)

router.post('/reset',authController.postReset)

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);


module.exports=router