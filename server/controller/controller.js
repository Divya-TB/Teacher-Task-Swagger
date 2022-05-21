var userdb = require('../model/model')

const query = require('../commonqueries/queries')

const {deleted,findandupdate,findone} = require('../commonqueries/queries')

const {APIFeatures} = require('../commonqueries/common')

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
        res.status(500).send({message:err.message||"some error occured while creating a create operation"})
    })

}

// retrieve and return all users

exports.find = async(req,res)=>{
    if(!req.body){
        return res.status(400).send({meassage:"data to be updated is empty"})
    }
    try{

        const features= new APIFeatures(userdb.find(),req.query).sort().paginate()

        const data = await features.query

        if(data){
        res.status(200).json({
            message:"found the dtails of teachers",
            list:data
        })
    }
    }
   
     
    catch(err){
        
        res.status(500).json({message:err.messsage||'no content'})
    }

}

//get the detils by active/inactive/name/subject

exports.findact =  async (req,res)=>{
     const regex = req.params.select
     var query = {"$or":[{name: regex},{Status:regex},{subject:regex}]}
     await findone(query,req,res)
}


//get by id

exports.findid=(req,res)=>{
    if(!req.body){
        return res.status(400).send({meassage:"data to be updated is empty"})
    }
    const id = req.params.id
    userdb.findById(id,req.body).then(data=>{ 
            res.send(data)
    })
    .catch(err=>{
        res.send(err)
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




