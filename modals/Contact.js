const mongoose = require('mongoose')


//define schema
const ContactSchema = new mongoose.Schema({

name:{
    type:String,
    require:true
},
email:{
    type:String,
    require:true
},
phone:{
    type:String,
    require:true
},
message:{
    type:String,
    require:true
},


},)
// contact is the name of collection
const ContactModel =mongoose.model('add',ContactSchema)

module.exports = ContactModel