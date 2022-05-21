const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')

var schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
     
    },
    phone:{
        type:String,
        unique:true,
        required:true,
        
    },
    password:{
        type:String,
        required:true

    },
   isAdmin:Boolean
  
},{timestamps :true})




const admins = mongoose.model('admins',schema)

module.exports = admins