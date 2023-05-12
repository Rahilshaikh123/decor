const User=require("../model/usermodel")
const CustomError=require("../errors/index")
const {StatusCodes}=require("http-status-codes")
const {  assigncookies } = require("../utils/jwta&cookie")
const createToken = require("../utils/createtoken")
const registerUser=async(req,res)=>{
    const {name,email,password}=req.body
    
    const emailCheck=await User.findOne({email})
    if(emailCheck){
        throw new  CustomError.BadRequestError("Email already exist")
    }
    
    const firstuser=await User.countDocuments({})
    const role=!firstuser?"admin":"user"
    
    const registeruser=await User.create({name,email,password,role})
    const tokendata =createToken(registeruser)
    assigncookies(res,tokendata)
    res.status(StatusCodes.CREATED).json(tokendata)

}
const loginUser=async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!email && !password){
        throw new CustomError.BadRequestError("Please provide proper email and password")
    }
    if(!user){
         throw new CustomError.NotFoundError("User does not exist")
    }
    console.log(user)
    const checkPass=await user.checkpassword(password)
    if(!checkPass){
        throw new CustomError.BadRequestError("Incorrect password")
    }
    const tokendata=createToken(user)
    const createjwt=assigncookies(res,tokendata)
    

    res.status(200).json({tokendata})

}
const logoutUser=async(req,res)=>{
    res.cookie("token","logout",{
        httpOnly:true,
        expires:new Date(Date.now()),

    })
    res.status(200).json({msg:"succesfully logout"})

}

module.exports={
    registerUser,
    loginUser,
    logoutUser
}