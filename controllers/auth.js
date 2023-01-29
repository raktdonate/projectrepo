exports.getLogin=(req,res,next)=>{
    res.render('auth/login',{
        pageTitle:'Login Page',
        isAuth:false
    })
}

exports.postLogin=(req,res,next)=>{
    req.session.isLoggedIn=true
    res.redirect('/');
}

exports.getSignup=(req,res,next)=>{
    res.render('auth/signup',{
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