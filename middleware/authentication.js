
const CustomError=require("../errors/index")
const { jwtverify } = require("../utils")


const authenticateUser=async(req,res,next)=>{
  const usertoken=req.signedCookies.token
  const authuser=jwtverify(usertoken)

 if(!authuser){
    throw new CustomError.UnauthenticatedError("empty token")
  }

  req.user=authuser.user
  next()
 
}
const autherizeUser=(...roless)=>{
  return (req,res,next)=>{
    try {
       if(!roless.includes(req.user.role)){
      throw new CustomError.UnauthorizedError("risticted route")
    }
    next()
    } catch (error) {
      throw new CustomError.UnauthenticatedError("invalid token")
      
    }
   
    

  }
}

module.exports={authenticateUser,
  autherizeUser
}