
var userdb = require('../model/model')


exports.pagination =(req,res)=>{
const page = req.query.page * 1 || 1
const limit = req.query.limit *1 ||2
const skip = (page -1) * limit
return {skip,limit}
}

exports.checkID = (req,res)=>{
  
    res.status(500).send({message:`cannot found the id : ${req.params.id}`})


}
