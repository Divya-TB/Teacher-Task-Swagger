




const req = require("express/lib/request")

const res = require('express/lib/response')

var students = require('../model/student-model')

const {APIFeatures} = require ('../commonqueries/common')


const findone = async (value,req,res)=>{
   
    try
    
    {
        
        var features= new APIFeatures(students.find(value),req.query).sort().paginate()
        var data = await features.query
       
        if(!data){
            res.status(202).json({message:'no content '})
        }
        else{
           res.status(200).json({
            
            message:" Success!!found the details of students",
            list:data
        })
        
        }
    }
    catch(err){
      return  res.status(500).json({message:err.messsage||'not found the value'})
    }

  }
  
   const findandupdate =async (query,req,res)=>{
   return await students.findOneAndUpdate(query,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(202).json({message:`no content with ${id}`})
        }else{
            res.status(200).json({
                message:"updated the details of Students and listed",
                list: data
            })
        }
           
        })
    
    .catch(()=>{
        res.status(500).send(`something went wrong!may be wrong id ${query}`)
    })
    
   }


const deleted = async (query,res)=>{

  return  await students.findByIdAndDelete(query) .then(data=>{
      if(!data){
          res.status(202).send(`no content with ${query}`)
      }
      else{
      res.status(200).json({
          message:`successfully!! deleted the details of ${query}`
      })
      }
  })
  .catch(err=>{
      res.status(500).send(`not found the id ${query}`)
  })
}

module.exports = {deleted,findone,findandupdate}

