const Jwt = require('jsonwebtoken')
const dotenv =require('dotenv')
const req = require('express/lib/request')
 exports.signAccessToken = (name, req,res)=>{
        const payload ={
            name
        }
        const secret = process.env.SECRET
        const options = {
            expiresIn:"24h"
        }
    var token =  Jwt.sign(payload,secret,options)
    res.status(200).json({
        
        message:"login successfully!!!",
        name,
        token,
    
    })
 }


     
    
 