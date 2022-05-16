const express = require('express')

const router = express.Router()


const controller =  require('../controller/controller')


//router.param('id',controller.checkID)



//swagger

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
 * /api/teachers/selects/{select}:
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
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer
 *              required: true
 *                                
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


router
    .route('/')
    .post(controller.create)
    .get(controller.find)


 router.get('/:id',controller.findid)
router.get('/selects/:select',controller.findact)
router.put('/update/:id',controller.update)
 router.delete('/delete/:id',controller.delete)

 module.exports = router