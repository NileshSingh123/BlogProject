const mongoose = require('mongoose')



//define schema
const AboutSchema = new mongoose.Schema({
          
          description:{
            type:String,
            required:true
          },
          image:{
            public_id:{
              type:String
            },
            url:{
              type:String
            }
          }
           
})

//create collection
//about is the name of collection
//about schema is the field of blog collection  
const AboutModel = mongoose.model('display',AboutSchema)


module.exports = AboutModel