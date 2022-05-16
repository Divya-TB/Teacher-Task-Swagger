var userdb = require('../model/model')

const query = require('../commonqueries/queries')

//create and save new user

exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(202).send({message:'content is empty'})
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
     const regex = req.params.select
     const {skip, limit} = server.pagination(req,res)
    userdb.find({"$or":[{Status:regex},{name:regex},{subject:regex}]}).sort({
            name:1
    }).skip(skip).limit(limit).then(data=>{
   res.send(data)
    })
    .catch(err =>{
        res.status(500).send({meassage:`Not found the data of ${regex}`})
    })
   


}




//get by id


exports.findid =(req,res)=>{
    if(!req.body){
        return res.status(400).send({meassage:"data to be updated is empty"})
    }
    const id = req.params.id
    userdb.findById(id,req.body).then(data=>{ 
            res.send(data)
    })
    .catch(()=>{
        query.checkID(req,res)
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
       res.send(data)
})
 .catch(()=>{
     query.checkID(req,res)
})
}

//delete a user 
exports.delete = (req,res)=>{
const id = req.params.id

userdb.findByIdAndDelete(id).then(()=>{

    res.send({meassage:"details was deleted successfully!"})
})
.catch(()=>{
    query.checkID(req,res)
})
}
