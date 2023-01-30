const User=require('../model/user')

exports.getIndex=(req,res,next)=>{
    res.render('index',{
        pageTitle:'Home Page',
        isAuth:req.session.isLoggedIn
    })
}
exports.getDonorCommunity=(req,res,next)=>{
    User.find({isDonor:true}).then(users=>{
        res.render('donor_community',{
            pageTitle:'Home Page',
            isAuth:req.session.isLoggedIn,
            userData:users
        })
    })
    
}
exports.getJoinCommunity=(req,res,next)=>{
    if(!req.session.isLoggedIn){
        console.log("to join donor community first login")
        return res.redirect('/login')
    }
    User.find({isDonor:true}).then(users=>{
        res.render('joincommunity',{
            pageTitle:'Home Page',
            isAuth:req.session.isLoggedIn,
            userData:users
        })
    })
    
}
exports.postJoinCommunity=(req,res,next)=>{
    if(!req.session.isLoggedIn){
        console.log("to join donor community first login")
        return res.redirect('/login')
    }
    if(req.user.isDonor){
        console.log("you are already a donor")
        return res.redirect('/')
        // res.render('index',{
        //     pageTitle:'Home Page',
        //     isAuth:req.session.isLoggedIn
        // })
    }
    const city=req.body.city
    const contact=req.body.contact
    req.user.city=city
    req.user.contact=contact
    req.user.isDonor=true;
    req.user.save().then(result=>{
        User.find({isDonor:true}).then(users=>{
            res.render('donor_community',{
                pageTitle:'Home Page',
                isAuth:req.session.isLoggedIn,
                userData:users
            })
        })
    })
    // console.log(name,email,city,contact)
}
exports.postSearch=(req,res,next)=>{
    const city=req.body.search
    console.log(city)
    User.find({isDonor:true,city:city}).then(users=>{
        res.render('donor_community',{
            pageTitle:'Home Page',
            isAuth:req.session.isLoggedIn,
            userData:users
        })
    })
}
exports.getProfile=(req,res,next)=>{
    res.render('profile',{
        pageTitle:'Home Page',
        isAuth:req.session.isLoggedIn
    })
}