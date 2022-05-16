var students = require('../model/student-model')

const query = require('../commonqueries/queries')

exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(202).send({message:'content is empty'})
        return
    }

    //new teacher

    const student =new students({
        rollnumber:req.body.rollnumber,
        name:req.body.name,
        class:req.body.class,
        email:req.body.email,
        address:req.body.address,
        phone:req.body.phone,
       
      
    })

    //save the dta in database

    student.save(student).then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"some error occured while creating a create operation"})
    })

}

// retrieve and return all users

exports.find=(req,res)=>{
students.find().sort({
name:1
}).then(data=>{
    res.send(data)
})
.catch(()=>{
res.status(500).send({message:"data is empty"})
})
}




//list all teachers that are active

exports.findstu =  (req,res)=>{
     const regex = req.params.select
     const {skip, limit} = query.pagination(req,res)
   
    students.find({"$or":[{name:regex},{class:regex},{rollnumber:regex}]}).sort({
            name:1
    }).skip(skip).limit(limit).then(data=>{
     
      res.send(data)
   
    })
    .catch(err =>{
        res.status(500).send({meassage:err.message||`Not found the data of ${regex}`})
    })
}




//get by id


exports.findid =(req,res)=>{
    if(!req.body){
        return res.status(400).send({meassage:"data to be updated is empty"})
    }
    const id = req.params.id
    students.findById(id,req.body).then(data=>{ 
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
    students.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
           res.status(200).send(data)
    })
     .catch(()=>{
         query.checkID(req,res)
    })
    }

//delete a user 

exports.delete = (req,res)=>{
    const id = req.params.id
    
    students.findByIdAndDelete(id).then(()=>{
    
        res.send({meassage:"details was deleted successfully!!"})
    })
    .catch(()=>{ query.checkID(req,res)
    
    })
    }
