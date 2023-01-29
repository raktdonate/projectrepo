exports.getError=(req,res,next)=>{
    res.render('error',{
        pageTitle:'Page not found',
        isAuth:req.session.isLoggedIn
    })
}