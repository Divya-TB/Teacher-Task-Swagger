

const errorhandler = (err,req,res,next)=>{
    return res.status(500).json({message:'something went wrong,Please try again'})
}


module.exports = errorhandler