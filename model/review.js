const mongoose=require("mongoose")
const Schema=mongoose.Schema
const reviewSchema= new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Review',reviewSchema)