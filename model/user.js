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
    },
    resetToken: String,
    resetTokenExpiration: Date,
    // isAdmin:Boolean,
    isAdmin:{
        type:Boolean
    }
})
module.exports=mongoose.model('User',userSchema)