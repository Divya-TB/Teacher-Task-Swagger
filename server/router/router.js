const express = require('express')
//const fs= require('fs')
const route = express.Router()

//const services = require('../services/render')

const controller =  require('../controller/controller')

//const file = fs.readFileSync('./dev-data/data/data.json','utf-8')



route.post('/api/teachers',controller.create)
route.get('/api/teachers',controller.find)
route.get('/api/teachers/:id',controller.findid)
route.get('/api/teacher/:Status',controller.findact)
route.get('/api/teacher/name/:name',controller.findname)
route.get('/api/teacher/subject/:subject',controller.findsubject)
route.put('/api/teachers/update/:id',controller.update)
route.delete('/api/teachers/delete/:id',controller.delete)

 module.exports = route