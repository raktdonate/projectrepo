exports.getError=(req,res,next)=>{
    res.render('error.ejs',{
        pageTitle:'Page not found'
    })
}