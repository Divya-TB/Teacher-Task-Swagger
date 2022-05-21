var admins = require('../model/admin')
const {authpage} = require('../commonqueries/queries')
const {validationResult} =  require('express-validator')
const {signAccessToken} = require('../middleware/token')
const bcrypt = require('bcrypt')

const { resetWatchers } = require('nodemon/lib/monitor/watch')

exports.create = async (req,res)=>{
   
    
    //validate request
    if(!req.body){
        res.status(202).send({message:'content is empty'})
        return
    }

    const errors = await validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

   bcrypt.hash(req.body.password, 10 , (err,hashedpass)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }
        else{

            //new teacher

            const admin =new admins({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password: hashedpass,
            isAdmin:req.body.isAdmin 
        })

         //save the dta in database

  admin.save(admin).then(result=>{
      res.status(200).json({
          message:"successfully registered!!!",
          data : result
      })
    })
    .catch(err=>{
        res.status(500).json({
            message:{message:err.message||"something went wrong"}
        })
    })
  }
})
}


exports.login = async (req,res,next)=>{
    const username = req.body.username
    const password = req.body.password
   await admins.findOne({"$or":[{email:username},{phone:username}]})
    .then(user=>{
      if(!user){
            res.status(202).json({message:`Acess denied,no admin with ${username} exist`})
      }
      
        else
         {
            if(!user.isAdmin){
                res.status(400).send('access denied')
            }
            else{
             bcrypt.compare(password,user.password,(err,result)=>{
           
            if(!result){
                return res.status(401).json({
                    msg:'password doesnot exist'
                })
            }
            else 
            {
                var payload = user.name
                signAccessToken(payload,req,res)
            }
           

        })
    }
    }
       

        
    })
    .catch(err=>{
        res.status(500).json({
          
            message:err.message||"Username does not exist"
        })
    })
    
}