const express = require('express')
const dotenv =require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const swaggerjsDoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')
const userdb = require('./server/model/model')
const students = require('./server/model/student-model')
const app = express()

const options ={
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Teacher-task",
            version: "1.0.0",
            
        },
        servers:[{
            url : "http://localhost:3000"
        }],
       
    },
    apis: ["./server/router/router.js","./server/router/student-router.js"]
}

const specs = swaggerjsDoc(options)
app.use("/api-docs",swaggerui.serve,swaggerui.setup(specs))

dotenv.config({path:'config.env'})
const PORT = process.env.PORT||8080


app.use(morgan('tiny'))


//mongodb connection

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)

const connectDB = async()=>{
    try{
        const con = await mongoose.connect(DB,{
            useNewUrlParser :true,
              
        })
        console.log(`mongodb connected : ${con.connection.host}`)
    }
    catch(err){
        console.lo("failed the connection")
        process.exit(1)
    }
}

connectDB()


//parse request to body parser


app.use(express.json())

app.use(bodyparser.urlencoded({extended:true}))

app.use(bodyparser.json())

//route

app.use('/api/teachers',require('./server/router/router'))
app.use('/api/students',require('./server/router/student-router'))


 
app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`)
})

