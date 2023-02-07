const User = require('../model/user');
const crypto = require('crypto');
const Ngo = require('../model/ngo')

const bcrypt = require('bcryptjs');
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

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login Page',
    isAuth: false
  })
}

exports.postLogin = (req, res, next) => {

  const email = req.body.email
  const password = req.body.password
  const errors = validationResult(req)
  if (email === 'abbash7613@gmail.com' && password === '123654') {
    User.findOne({ email: email }).then(user=>{
      if(user){
        console.log(user.email)
        console.log(user.password)
        req.session.isLoggedIn = true
        req.session.user = user
        user.isAdmin=true
        user.save().then(result=>{
          console.log('admin')
          return req.session.save(result => {
            res.redirect('/')
          })
        })
      }  
    }).catch(err=>{

    })
  }
  else {
    if (!errors.isEmpty()) {
      return res.render('auth/signup', {
        path: '/login',
        pageTitle: 'Login',
        isAuth: false,
        errorMessage: errors.array()[0].msg

      })
    }

    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return res.redirect('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password',
            isAuth: false,
            validationError: []
          })
        }
        bcrypt.compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isLoggedIn = true
              req.session.user = user
              return req.session.save(result => {
                res.redirect('/')
              })
            }
            return res.render('auth/login', {
              path: '/login',
              pageTitle: 'Login',
              isAuth: false,
              errorMessage: 'Invalid email or password',
              validationError: []
            })
          })
      })
      .catch(err => {
        console.log(err)
      })
  }


}

exports.getSignupMain = (req, res, next) => {
  res.render('auth/signupmain', {
    path: '/signup',
    pageTitle: 'Signup Page',
    isAuth: false
  })
}

exports.getSignupUser = (req, res, next) => {
  res.render('auth/signupuser', {
    path: '/signup',
    pageTitle: 'Signup Page',
    isAuth: false
  })
}

exports.getSignupNgo = (req, res, next) => {
  res.render('auth/signupngo', {
    path: '/signup',
    pageTitle: 'Signup Page',
    isAuth: false
  })
}


exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err)
    // res.redirect('/')
    res.render('index', {
      pageTitle: 'Home Page',
      isAuth: false,
      userData:req.user
    })
  })
}
exports.postSignupUser = (req, res, next) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const errors = validationResult(req)
  console.log(username, email, password)
  if (!errors.isEmpty()) {
    console.log(errors.array())
    console.log('error')
    return res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      isAuth: false,
      errorMessage: errors.array()[0].msg
    })
  }
  bcrypt.hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        username: username,
        email: email,
        password: hashedPassword
      })
      return user.save()//to prevent nesting of two promises
    })
    .then(result => {
      res.redirect('/login')
    })
    .catch(err => console.log(err))
}

exports.postSignupNgo = (req, res, next) => {
  const email = req.body.email
  const city = req.body.city
  const contact = req.body.contact
  const state = req.body.state
  const regno = req.body.regno
  const name = req.body.name
  const ngo = new Ngo({
    contact: contact,
    city: city,
    email: email,
    name: name,
    regno: regno,
    state: state
  })
  ngo.save().then(result => {
    res.render('auth/ngomessage', {
      path: '/reset',
      pageTitle: 'reset Page',
      isAuth: false
    })
  }).catch(err => {

  })
}

exports.getReset = (req, res, next) => {
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'reset Page',
    isAuth: false
  })
}
exports.postReset = (req, res, next) => {
  console.log('abbas')
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        res.redirect('/');
        transporter.sendMail({
          to: req.body.email,
          from: 'rakt0304@gmail.com',
          subject: 'Password reset',
          html: `
                <p>You requested a password reset</p>
                <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
              `
        });
      })
      .catch(err => {
      });
  });
}

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        userId: user._id.toString(),
        passwordToken: token,
        isAuth: false
      })
    })
    .catch(err => {
      console.log(err)
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId
  })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
    });
};
