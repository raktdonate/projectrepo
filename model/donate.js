const mongoose=require('mongoose')

const Schema=mongoose.Schema
const DonateSchema = new Schema({}, { strict: false });

module.exports=mongoose.model('Donate',DonateSchema)
