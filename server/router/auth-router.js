const express = require('express')

const router = express.Router()


const controller =  require('../controller/authcontroller')

const {check} = require('express-validator')




//swagger

/**
 * @swagger
 * components:
 *      schemas:
 *          Admin:
 *              type: object
 *              required:
 *                  - name
 *                  - email
 *                  - phone
 *                  - password
 *                  - isAdmin
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  phone:
 *                      type: integer
 *                  password:
 *                      type: string
 *                  isAdmin:
 *                      type: boolean
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          Admins:
 *              type: object
 *              required:
 *                  - username             
 *                  - password
 *              properties:
 *                  
 *                
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 *                 
 */


/**
 * @swagger
 * /api/admin/register:
 *  post:
 *     description:  REgister Admin details
 *     requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Admin'
 * 
 *     responses:
 *          200:
 *              description: list of Admin
 *              
 */

/**
 * @swagger
 * /api/admin/login:
 *  post:
 *     description:  login Admin 
 *     requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Admins'
 * 
 *     responses:
 *          200:
 *              description: list of Admin
 *              
 */






router
    .route('/register')
    .post([check("email","email should be valid").isEmail(),
check("password","password atleast should be 8 charcters").isLength({min:8})],controller.create)

 router.route('/login').post(controller.login)



 module.exports = router