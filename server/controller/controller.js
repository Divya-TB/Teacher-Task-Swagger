var userdb = require('../model/model')


//create and save new user

exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:'content is empty'})
        return
    }

    //new teacher

    const teacher =new userdb({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        subject:req.body.subject,
        Status:req.body.Status
    })

    //save the dta in database

    teacher.save(teacher).then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({message:err.meassage||"some error occured while creating a create operation"})
    })

}

// retrieve and return all users

exports.find=(req,res)=>{
userdb.find().sort({
name:1
}).then(data=>{
    res.send(data)
})
.catch(err=>{
    res.status(500).send({meassage:err.message||"not found "})
})
}




//list all teachers that are active

exports.findact =  (req,res)=>{
     const regex = req.params.Status
     const page = req.query.page * 1 || 1
     const limit = req.query.limit *1 ||2
     const skip = (page -1) * limit
    userdb.find({Status:regex}).sort({
            name:1
    }).skip(skip).limit(limit).then(data=>{
   res.send(data)
    })
    .catch(err=>{
        res.status(500).send({meassage:err.message||"not found "})
    })
   


}

// get teacher by name or subject
exports.findname =  (req,res)=>{
   const names = req.params.name
   userdb.find({name:names}).then(data=>{
       res.send(data)
   })
   .catch(err=>{
       res.status(500).send({meassage:err.message||"not found name"})
   })
  
}
//get teacher by subject

exports.findsubject =  (req,res)=>{
  
  const subjects = req.params.subject
     userdb.find({subject:subjects}).then(data=>{
        if(!data){
            return res.status(404).send({message:"cannot find the data"})
       }else{
            res.send(data)
       }   
     })
     .catch(err=>{
         res.status(500).send({meassage:err.message||"not found subject"})
     })
   
 }



//get by id

exports.findid =(req,res)=>{
    if(!req.body){
        return res.status(400).send({meassage:"data  is empty"})
    }
    const id = req.params.id
    userdb.findById(id,req.body).then(data=>{
        if(!data){
            res.status(404).send({message:"cannot find the data"})
       }else{
           return res.send(data)
       }

    })
}





//update a user by user id

exports.update = (req,res)=>{
if(!req.body){
    return res.status(400).send({meassage:"data to be updated is empty"})
}
const id = req.params.id
userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
.then(data=>{
    if(!data){
         res.status(404).send({message:"cannot update the data"})
    }else{
        return res.send(data)
    }
})
 .catch(err=>{
     res.status(500).send({message:"error"})
})
}

//delete a user 
exports.delete = (req,res)=>{
const id = req.params.id

userdb.findByIdAndDelete(id).then(data=>{
    if(!data){
        res.status(404).send({meassage:`cannot delete with id ${id}.Maybe ID is wrong`})

}
else{
    res.send({meassage:"details was deleted successfully!"})
}
})
}
