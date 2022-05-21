var students = require('../model/student-model')

const {APIFeatures,wrapper} = require('../commonqueries/common')

const {deleted,findandupdate,findone} = require('../commonqueries/studentt')


exports.create = async (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:'content is empty'})
        return
    }

    //new teacher

    const teacher =new students({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        subject:req.body.subject,
        Status:req.body.Status
    })

    //save the dta in database

   await teacher.save(teacher).then(data=>{
        res.status(200).json({
            status:'Success!!!saved the student details currently added',
            list : data
        })
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"some error occured while creating a details"})
    })

}

// retrieve and return all users

exports.find = async(req,res)=>{
    if(!req.body){
        return res.status(400).send({meassage:"data to be get is empty"})
    }
    try{

        const features= new APIFeatures(students.find(),req.query).sort().paginate()

        const data = await features.query

        if(data){
        res.status(200).json({
            message:"Successfully Listed the details of student's !",
            list:data
        })
    }
    }
   
     
    catch(err){
        
        res.status(500).json({message:err.messsage||'no content'})
    }

}

//get the detils by active/inactive/name/subject

exports.findstu =  async (req,res)=>{
     const regex = req.params.select
     var query = {"$or":[{name: regex},{class:regex},{rollnumber:regex}]}
     await findone(query,req,res)
}


//get by id

exports.findid = async (req,res)=>{
    if(!req.body){
        return res.status(400).send({meassage:"data to be updated is empty"})
    }
    const id = req.params.id
    await students.findById(id,req.body).then(data=>{ 
            res.status(200).json({
                message:`success! Found the deatils of student with  id : ${id}`,
                list : data
            })
    })
    .catch(err=>{
        res.status(500).send(err)
    })
    
}



//update a user by user id

exports.update = async (req,res)=>{
if(!req.body){
    return res.status(400).send({meassage:"data to be updated is empty"})
}
const id = req.params.id
 await findandupdate(id,req,res)
}

//delete the content 
exports.delete = async (req,res)=>{
       await deleted(req.params.id,res )
    
   }



   






        











