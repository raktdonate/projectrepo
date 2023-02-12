
const User=require('../model/user')
const Ngo=require('../model/ngo')
const Review=require('../model/review')
const fileHelper=require('../utils/file')
const review = require('../model/review')

exports.getIndex=(req,res,next)=>{
    Review.find().then(reviews=>{
        res.render('index',{
            pageTitle:'Home Page',
            isAuth:req.session.isLoggedIn,
            userData:req.user,
            revData:reviews,
            path:'/'
        })
    }).catch()
}

const Donate=require('../model/donate')
const mongodb=require('mongodb')

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rakt0304@gmail.com',
    pass: 'deqmaynvjuffksez'
  },
  tls:{
    rejectUnauthorized:false
},
  port: 465,
  host: 'smtp.gmail.com'
}
);


exports.getDonate=(req,res,next)=>{
    Donate.find().limit(20).then(users=>{
        res.render('donate',{
            pageTitle:'Home Page',
            isAuth:req.session.isLoggedIn,
            userData2:users,
            userData:req.user,
            path:'/donate'
        })
    })
}

exports.postDonate=(req,res,next)=>{
    const pinCode=req.body.pincode
    const state=req.body.state
    console.log('a')
    if(pinCode.length==0&&state.length==0){
        console.log('a')
        Donate.find().limit(20).then(users=>{
            console.log(users)
            res.render('donate',{
                pageTitle:'Home Page',
                isAuth:req.session.isLoggedIn,
                userData2:users,
                userData:req.user,
                path:'/donate'
            })
        })
    }
    else if(pinCode.length==0){
        console.log('b')
        Donate.find({State:state}).then(users=>{
            // console.log(users)
            console.log(users[0])
            res.render('donate',{
                pageTitle:'Home Page',
                isAuth:req.session.isLoggedIn,
                userData2:users,
                userData:req.user,
                path:'/donate'
            })
        })
    }
    else if(state.length==0){
        console.log('c')
        Donate.find({Pincode:pinCode}).then(users=>{
            res.render('donate',{
                pageTitle:'Home Page',
                isAuth:req.session.isLoggedIn,
                userData2:users,
                userData:req.user,
                path:'/donate'
            })
        })
    }
    else{
        Donate.find({Pincode:pinCode,State:state}).then(users=>{
            console.log('f')
            console.log(users)
            res.render('donate',{
                pageTitle:'Home Page',
                isAuth:req.session.isLoggedIn,
                userData2:users,
                userData:req.user,
                path:'/donate'
            })
        })
    }
}

exports.getAbout=(req,res,next)=>{
    console.log(req.user)
    res.render('aboutus',{
        pageTitle:'Home Page',
        isAuth:req.session.isLoggedIn,
        userData:req.user,
        path:'/aboutus'
    })
}

exports.getDonorCommunity=(req,res,next)=>{
    User.find({isDonor:true}).then(users=>{
        res.render('donor_community',{
            pageTitle:'Home Page',
            isAuth:req.session.isLoggedIn,
            userData2:users,
            userData:req.user,
            path:'/donor_community'
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
            userData:req.user,
            path:'/joincommunity'
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
                path:'/donor_community',
                isAuth:req.session.isLoggedIn,
                userData2:users,
                userData:req.user
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
                userData:req.user,
                path:'/donor_community'
            })
        })
    }
    else if(city.length==0){
        User.find({isDonor:true,blood:blood}).then(users=>{
            res.render('donor_community',{
                pageTitle:'Home Page',
                isAuth:req.session.isLoggedIn,
                userData2:users,
                userData:req.user,
                path:'/donor_community'
            })
        })
    }
    else if(blood.length==0){
        User.find({isDonor:true,city:city}).then(users=>{
            res.render('donor_community',{
                pageTitle:'Home Page',
                isAuth:req.session.isLoggedIn,
                userData2:users,
                userData:req.user,
                path:'/donor_community'
            })
        })
    }
    else{
        User.find({isDonor:true,city:city,blood:blood}).then(users=>{
            res.render('donor_community',{
                pageTitle:'Home Page',
                isAuth:req.session.isLoggedIn,
                userData2:users,
                userData:req.user,
                path:'/donor_community'
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
        userData:req.user,
        path:'/profile'
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
            userData:req.user,
            path:'/ngo_community'
        })
    })
}
exports.getChatPage=(req,res,next)=>{
    res.render('chat_page',{
        
    })
}
exports.postReview=(req,res,next)=>{
    const text=req.body.name
    // const username=req.body.username
    const review=new Review({
        userId:req.user._id,
        text:text,
        username:req.user.username
    })
    review.save().then(result=>{
        res.redirect('/')
    }).catch()
}
exports.getSendMail=(req,res,next)=>{
    const userId=req.params.userId
    res.render('mail',{
        pageTitle:'Home Page',
        isAuth:req.session.isLoggedIn,
        userData:req.user,
        path:'/mail',
        userId:userId
    })
}
exports.postMail=(req,res,next)=>{
    const userId=req.body.userId
    const msgMail=req.body.msgmail
    const contact=req.body.contact
    User.findOne({_id:new mongodb.ObjectId(userId)}).then(user=>{
        console.log(user)
        if(user){
            transporter.sendMail({
            to: user.email,
            from: 'rakt0304@gmail.com',
            subject: 'Donor Community Message',
            html: `<h1>Contact is: ${contact}</h1>
                  <p>${msgMail}</p>
                  `
          });
          res.redirect('/')

        }
        
    })
} 
