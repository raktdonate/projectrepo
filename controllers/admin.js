const Ngo=require('../model/ngo')
const mongodb=require('mongodb')

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rakt0304@gmail.com',
    pass: 'deqmaynvjuffksez'
  },
  port: 465,
  host: 'smtp.gmail.com'
}
);

exports.getList=(req,res,next)=>{
    Ngo.find({isPermit:undefined}).then(ngos=>{
        res.render('admin/ngolist',{
            pageTitle:'Home Page',
            isAuth:req.session.isLoggedIn,
            userData:req.user,
            ngos:ngos
        })
        }
    ).catch(err=>{
        console.log(err)
    })
}
exports.postPermit=(req,res,next)=>{
    const ngoid=req.body.ngoid
    Ngo.findOne({_id: new mongodb.ObjectId(ngoid)}).then(ngo=>{
        let password=Math.random().toString(36).slice(2) +
                Math.random().toString(36)
                    .toUpperCase().slice(2);
        console.log(password)
        ngo.isPermit=true
        ngo.password=password
        transporter.sendMail({
            to: ngo.email,
            from: 'rakt0304@gmail.com',
            subject: 'Your credentials',
            html: `
                  <p>Thank you for signing In</p>
                  <p>Your password is ${password}</p>
                `
          });
        ngo.save().then(result=>{
            console.log('save successful')
            res.redirect('/adminlist')
        }).catch()
    })
}