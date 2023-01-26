const express=require('express')
const app=express()
const path=require('path')
const mainRoutes=require('./routes/mainRoutes')


app.set('view engine','view')
app.set('views','views')
app.use(express.static(path.join(__dirname,'public')))

app.use(mainRoutes)

app.listen(3000)