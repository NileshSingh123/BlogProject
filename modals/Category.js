const mongoose = require('mongoose')



//define schema
const CategorySchema = new mongoose.Schema({
          catname:{
            type: String,
            require: true
          },
           
        },{timestamps:true})

//create collection
//category is the name of collection
//category chema is the field of category collection
const CategoryModel = mongoose.model('insert',CategorySchema)

module.exports = CategoryModel
