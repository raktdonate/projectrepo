exports.getIndex=(req,res,next)=>{
    res.render('index.ejs',{
        pageTitle:'Home Page'
    })
}
exports.getDonorCommunity=(req,res,next)=>{
    res.render('donor_community.ejs',{
        pageTitle:'Home Page'
    })
}
exports.postJoinCommunity=(req,res,next)=>{
    const name=req.body.name
    const email=req.body.email
    const city=req.body.city
    const contact=req.body.contact
    console.log(name,email,city,contact)
}
