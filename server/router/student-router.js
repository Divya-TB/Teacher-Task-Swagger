const express = require('express')

const router = express.Router()


const controller =  require('../controller/student-controller')


//router.param('id',controller.checkID)



//swagger

/**
 * @swagger
 * components:
 *      schemas:
 *          Students:
 *              type: object
 *              required:
 *                  - rollnumber
 *                  - name
 *                  - class
 *                  - email
 *                  - phone
 *                  - address
 *                  
 *    
 *              properties:
 *                  rollnumber:
 *                      type: string
 *                  name:
 *                      type: string
 *                  class:
 *                      type: string
 *                  email:
 *                      type: string
 *                  phone:
 *                      type: integer
 *                  address:
 *                      type: string
 *              
 */

/**
 * @swagger
 * /api/students/getallstudents:
 *  get:
 *     description:  get all the Students
 *     parameters:
 *          - in: query
 *            name: page number(pagination)
 *            schema:
 *              type: integer
 *              required: true
 *     responses:
 *      200:
 *         description: list of teachers
 *         content:
 *             application/json:
 *                   schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Students'     
 */



/**
 * @swagger
 * /api/students/{id}:
 *  get:
 *     description:  get all the students details
 *    
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: The student id
 *     responses:
 *          200:
 *              description: list of students
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/Students'     
 */



/**
 * @swagger
 * /api/students/selects/{select}:
 *  get:
 *     description: get all the students by rollnumber,name,class
 *     parameters:
 *          - in: path
 *            name: Search with Rollnumber,name,class
 *            schema:
 *              type: string
 *              required: true
 *              description: list of students 
 *                                
 *     responses:
 *          200:
 *              description: list of students
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/Students'     
 */



/**
 * @swagger
 * /api/students/createstudents:
 *  post:
 *     description:  create students details
 *     requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Students'
 * 
 *     responses:
 *          200:
 *              description: list of students
 *              
 */


/**
 * @swagger
 * /api/students/update/{id}:
 *  put:
 *     description:  update details of  student
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
 *                      $ref: '#/components/schemas/Students'
 *     responses:
 *          200:
 *              description: updated the details of student
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/Students'     
 */

/**
 * @swagger
 * /api/students/delete/{id}:
 *  delete:
 *     description:  Delete the details of a student by Id
 *    
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: Deleted the student by id
 *      
 *     responses:
 *          200:
 *              description: delete the details of student
 
 */


router
    .route('/createstudents')
    .post(controller.create)
router
    .route('/getallstudents').get(controller.find)


  router.get('/:id',controller.findid)
  router.get('/selects/:select',controller.findstu)
 router.put('/update/:id',controller.update)
 router.delete('/delete/:id',controller.delete)

 module.exports = router