const User = require('../model/user');
const bcrypt=require("bcryptjs")
const {validationResult}=require('express-validator/check')

exports.getLogin=(req,res,next)=>{
    res.render('auth/login',{
        path:'/login',
        pageTitle:'Login Page',
        isAuth:false
    })
}

exports.postLogin=(req,res,next)=>{

    const email=req.body.email
    const password=req.body.password
    const errors=validationResult(req)
    
    if(!errors.isEmpty()){
        return res.render('auth/signup',{
            path:'/login',
            pageTitle:'Login',
            isAuth:false,
            errorMessage:errors.array()[0].msg
            
        })
    }

    User.findOne({email:email})
        .then(user=>{
            if(!user){
                return res.redirect('auth/login',{
                    path:'/login',
                    pageTitle:'Login',
                    errorMessage:'Invalid email or password',
                    isAuth:false,
                    validationError:[]
                })
            }
            bcrypt.compare(password,user.password)
            .then(doMatch=>{
                if(doMatch){
                    req.session.isLoggedIn=true
                    req.session.user=user
                    return req.session.save(result=>{
                        res.redirect('/')
                    })
                }
                return res.render('auth/login',{
                    path: '/login',
                    pageTitle: 'Login',
                    isAuth: false,
                    errorMessage:'Invalid email or password',
                    validationError:[]
                })
            })       
        })
        .catch(err=>{
            console.log(err)
        })
}

exports.getSignup=(req,res,next)=>{
    res.render('auth/signup',{
        path:'/signup',
        pageTitle:'Signup Page',
        isAuth:false
    })
}


exports.postLogout=(req,res,next)=>{
    req.session.destroy((err)=>{
        console.log(err)
        // res.redirect('/')
        res.render('index',{
            pageTitle:'Home Page',
            isAuth:false
        })
    })
}
exports.postSignup=(req,res,next)=>{
    const username=req.body.username
    const email=req.body.email
    const password=req.body.password
    const errors=validationResult(req)
    console.log(username,email,password)
    if(!errors.isEmpty()){
        console.log(errors.array())
        console.log('error')
        return res.render('auth/signup',{
            path:'/signup',
            pageTitle:'Signup',
            isAuth:false,
            errorMessage:errors.array()[0].msg
        })
    }
    bcrypt.hash(password,12)
        .then(hashedPassword=>{
            const user=new User({
                username:username,
                email:email,
                password:hashedPassword
            })
            return user.save()//to prevent nesting of two promises
        })
        .then(result=>{
            res.redirect('/login')
        })
        .catch(err=>console.log(err))
}