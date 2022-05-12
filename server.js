const express = require('express')
const dotenv =require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const connectDB = require('./server/database/connection')
const cors = require('cors')
const swaggerjsDoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')



const app = express()







dotenv.config({path:'config.env'})
const PORT = process.env.PORT||8080


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
    apis: ["server.js"]
}

const specs = swaggerjsDoc(options)
app.use("/api-docs",swaggerui.serve,swaggerui.setup(specs))


app.use(morgan('tiny'))



//mongodb connection

connectDB()

//parse request to body parser


app.use(express.json())

app.use(bodyparser.urlencoded({extended:true}))

app.use(bodyparser.json())



app.use('/',require('./server/router/router'))


/**
 * @swagger
 * components:
 *      schemas:
 *          Teachers:
 *              type: object
 *              required:
 *                  - name
 *                  - email
 *                  - phone
 *                  - subject
 *                  - Status
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  phone:
 *                      type: integer
 *                  subject:
 *                      type: string
 *                  Status:
 *                      type: string
 */

/**
 * @swagger
 * /api/teachers:
 *  get:
 *     description:  get all the teachers
 *     responses:
 *      200:
 *         description: list of teachers
 *         content:
 *             application/json:
 *                   schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Teachers'     
 */



/**
 * @swagger
 * /api/teachers/{id}:
 *  get:
 *     description:  get all the teachers
 *    
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: The teacher id
 *     responses:
 *          200:
 *              description: list of teachers
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/Teachers'     
 */



/**
 * @swagger
 * /api/teacher/{Status}:
 *  get:
 *     description:  get all the teachers by active/inactive
 *    
 *     parameters:
 *          - in: path
 *            name: Status
 *            schema:
 *              type: string
 *              required: true
 *              description: The teachers that are active or inactive                    
 *     responses:
 *          200:
 *              description: list of teachers
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/Teachers'     
 */

/**
 * @swagger
 * /api/teacher/name/{name}:
 *  get:
 *     description:  get all the teachers by name
 *    
 *     parameters:
 *          - in: path
 *            name: name
 *            schema:
 *              type: string
 *              required: true
 *              description: seaching teachers by their name
 *     responses:
 *          200:
 *              description: list of teachers
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/Teachers'     
 */

/**
 * @swagger
 * /api/teacher/subject/{subject}:
 *  get:
 *     description:  get all the teachers by the subject
 *    
 *     parameters:
 *          - in: path
 *            name: subject
 *            schema:
 *              type: string
 *              required: true
 *              description: search the teachers by their subject they are teaching.
 *     responses:
 *          200:
 *              description: list of teachers
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/Teachers'     
 */

/**
 * @swagger
 * /api/teachers:
 *  post:
 *     description:  create teacher details
 *     requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Teachers'
 * 
 *     responses:
 *          200:
 *              description: list of teachers
 *              
 */


/**
 * @swagger
 * /api/teachers/update/{id}:
 *  put:
 *     description:  update details of  teachers 
 *    
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: Update the deatils
 *     requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Teachers'
 *     responses:
 *          200:
 *              description: updated the details of teacher
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/Teachers'     
 */

/**
 * @swagger
 * /api/teachers/delete/{id}:
 *  delete:
 *     description:  Delete the details of a teacher by Id
 *    
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: Deleted the teachers by id
 *      
 *     responses:
 *          200:
 *              description: delete the details of teachers
 
 */



 



app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`)
})