
const mongoose = require('mongoose')

const dotenv = require('dotenv')
//const app = require('./app')

dotenv.config({path:'./config.env'})


const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)

const connectDB = async()=>{
    try{
        const con = await mongoose.connect(DB,{
            useNewUrlParser :true,
              
        })
        console.log(`mongodb conneccted : ${con.connection.host}`)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}
//  mongoose.connect(DB,{ // local database connection
//      useNewUrlParser :true,
//      useCreateIndex:true
    
//  }).then(()=>{
//     console.log('DB connection successful')
//  })

 module.exports =connectDB