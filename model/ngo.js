const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ngoSchema =new Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    regno:{
        type:String,
        required:true
    },
    isPermit:{
        type:Boolean
    },
    password:{
        type:String
    },
    profileUrl:{
        type:String
    }
})
module.exports=mongoose.model('Ngo',ngoSchema)