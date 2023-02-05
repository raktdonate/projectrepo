const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema =new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    contact:{
        type:Number
    },
    city:{
        type:String
    },
    isDonor:{
        type:Boolean
    },
    blood:{
        type:String
    },
    profileUrl:{
        type:String
    }
})
module.exports=mongoose.model('User',userSchema)