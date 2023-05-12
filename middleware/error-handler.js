const { StatusCodes } = require('http-status-codes');
const {CustomApiError}=require("../errors/index")
const errorHandlerMiddleware=async(err,req,res,next)=>{
  const customError={
    statuscode:err.StatusCodes||StatusCodes.BAD_REQUEST,
    message:err.message||"Internal server error"
  }
  if(err.name==="ValidatorError"){
    customError.message=err.message
    customError.statuscode=StatusCodes.BAD_REQUEST
  }
 res.status(customError.statuscode).json({msg:customError.message})
}

module.exports=errorHandlerMiddleware
