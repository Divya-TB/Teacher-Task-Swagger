const express = require('express')

const router = express.Router()


const controller =  require('../controller/student-controller')


//router.param('id',controller.checkID)



//swagger

/**
 * @swagger
 * components:
 *      schemas:
 *          Teachers:
 *              type: object
 *              required:
 *                  - id
 *                  - name
 *                  - email
 *                  - phone
 *                  - Address
 *    
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  phone:
 *                      type: integer
 *                  Address:
 *                      type: string
 *              
 */

/**
 * @swagger
 * /api/students:
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
 * /api/students/{id}:
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
 * /api/students/selects/{select}:
 *  get:
 *     description:  get all the teachers by active/inactive/name/subject
 *    
 *     parameters:
 *          - in: path
 *            name: select
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
 * /api/students:
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
 * /api/students/update/{id}:
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
 * /api/students/delete/{id}:
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


router
    .route('/')
    .post(controller.create)
    .get(controller.find)


 router.get('/:id',controller.findid)
 router.get('/selects/:select',controller.findstu)
 router.put('/update/:id',controller.update)
 router.delete('/delete/:id',controller.delete)

 module.exports = router