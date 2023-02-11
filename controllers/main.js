
const User=require('../model/user')
const Ngo=require('../model/ngo')
const fileHelper=require('../utils/file')

exports.getIndex=(req,res,next)=>{
    console.log(req.user)
    res.render('index',{
        pageTitle:'Home Page',
        isAuth:req.session.isLoggedIn,
        userData:req.user
    })
}

exports.getAbout=(req,res,next)=>{
    console.log(req.user)
    res.render('aboutus',{
        pageTitle:'Home Page',
        isAuth:req.session.isLoggedIn,
        userData:req.user
    })
}

exports.getDonorCommunity=(req,res,next)=>{
    User.find({isDonor:true}).then(users=>{
        res.render('donor_community',{
            pageTitle:'Home Page',
            isAuth:req.session.isLoggedIn,
            userData2:users,
            userData:req.user
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
            userData2:users,
            userData:req.user
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
    const blood=req.body.blood
    req.user.city=city
    req.user.blood=blood
    req.user.contact=contact
    req.user.isDonor=true;
    req.user.save().then(result=>{
        User.find({isDonor:true}).then(users=>{
            res.render('donor_community',{
                pageTitle:'Home Page',
                isAuth:req.session.isLoggedIn,
                userData2:users
            })
        })
    })
    // console.log(name,email,city,contact)
}
exports.postSearch=(req,res,next)=>{
    const blood=req.body.blood
    const city=req.body.city
    if(city.length==0&&blood.length==0){
        User.find({isDonor:true}).then(users=>{
            res.render('donor_community',{
                pageTitle:'Home Page',
                isAuth:req.session.isLoggedIn,
                userData2:users,
                userData:req.user
            })
        })
    }
    else if(city.length==0){
        User.find({isDonor:true,blood:blood}).then(users=>{
            res.render('donor_community',{
                pageTitle:'Home Page',
                isAuth:req.session.isLoggedIn,
                userData2:users,
                userData:req.user
            })
        })
    }
    else if(blood.length==0){
        User.find({isDonor:true,city:city}).then(users=>{
            res.render('donor_community',{
                pageTitle:'Home Page',
                isAuth:req.session.isLoggedIn,
                userData2:users,
                userData:req.user
            })
        })
    }
    else{
        User.find({isDonor:true,city:city,blood:blood}).then(users=>{
            res.render('donor_community',{
                pageTitle:'Home Page',
                isAuth:req.session.isLoggedIn,
                userData2:users,
                userData:req.user
            })
        })
    }
}
exports.getProfile=(req,res,next)=>{
    const edit=req.query.edit
    res.render('profile',{
        pageTitle:'Home Page',
        isAuth:req.session.isLoggedIn,
        edit:edit,
        userData:req.user
    })
}
exports.postChanges=(req,res,next)=>{
    const image=req.file
    
    if(image){
        if(req.user.profileUrl){
            fileHelper.deleteFile(req.user.profileUrl);
        }
        req.user.profileUrl=image.path
    }
    req.user.username=req.body.username
    req.user.save().then(result=>{
        res.redirect('/')
    })
}
exports.getNgoCommunity=(req,res,next)=>{
    Ngo.find({isPermit:true}).then(ngos=>{
        res.render('ngo_community',{
            pageTitle:'Home Page',
            isAuth:req.session.isLoggedIn,
            userData2:ngos,
            userData:req.user
        })
    })
}
exports.getChatPage=(req,res,next)=>{
    res.render('chat_page',{
        
    })
}