exports.getLogin=(req,res,next)=>{
    res.render('auth/login.ejs',{
        pageTitle:'Login Page'
    })
}
exports.getSignup=(req,res,next)=>{
    res.render('auth/signup.ejs',{
        pageTitle:'Signup Page'
    })
}