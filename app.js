const express=require('express')
const app=express()
const path=require('path')
const mainRoutes=require('./routes/mainRoutes')
const authRoutes=require('./routes/authRoutes')
const errorController=require('./controllers/error')
const router=express.Router()


app.set('view engine','view')
app.set('views','views')
app.use(express.static(path.join(__dirname,'public')))

app.use(mainRoutes)
app.use(authRoutes)
app.use(errorController.getError);

app.listen(3000)