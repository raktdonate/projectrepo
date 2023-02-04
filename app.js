const express=require('express')
const app=express()
const path=require('path')
const bodyparser=require('body-parser')
const mainRoutes=require('./routes/mainRoutes')
const authRoutes=require('./routes/authRoutes')
const session=require('express-session')
const MongoDBStore=require('connect-mongodb-session')(session)
const errorController=require('./controllers/error')
const mongoose=require('mongoose')
const User=require('./model/user')
const MONGODB_URI='mongodb+srv://blood77:raktkhuab123@cluster0.cwywrfk.mongodb.net/blooddonation';
const store=new MongoDBStore({
    uri:MONGODB_URI,
    collection:'sessions'
});

app.set('view engine','ejs')
app.set('views','views')
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use(session({secret:'my secret',resave:false,saveUninitialized:false,store:store}))

app.use((req, res, next) => {
  if(!req.session.user){
    return next();
  }
  
    User.findById(req.session.user._id)
      .then(user => {
        req.user =user;
        next();
      })
      .catch(err => console.log(err));
  }
);

app.use(mainRoutes)
app.use(authRoutes)
app.use(errorController.getError);


mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(result=>{  
    app.listen(3000);
  }).catch(err=>{
    console.log(err)
  })