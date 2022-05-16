
var students = require('../model/model')


exports.pagination =(req,res)=>{
const page = req.query.page * 1 || 1
const limit = req.query.limit *1 ||2
const skip = (page -1) * limit
return {skip,limit}
}

exports.checkID = (req,res)=>{
  
    res.status(500).send({message:`cannot found the id : ${req.params.id}`})


}
exports.checkById =  (req,res)=>{
if(!req.body){
    return res.status(400).send({meassage:"data to be updated is empty"})
}
const id = req.params.id
students.findById(id,req.body).then(data=>{ 
        return res.send(data)
})
.catch(()=>{
   return res.status(500).send({message:`cannot found the id : ${req.params.id}`})


})
}
