const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')

var schema = new mongoose.Schema({
    rollnumber:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
  
    address:{
        type:String,
        required:true

    },
    phone:{
        type:Number,
        required:true
    }
    
   
})

const students = mongoose.model('students',schema)

module.exports = students