const User = require('../model/user');
const bcrypt=require("bcryptjs")

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

    User.findOne({email:email})
        .then(user=>{
            if(!user){
                return res.redirect('/login')
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
                    isAuthenticated: false,
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
    console.log(username,email,password)
 
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