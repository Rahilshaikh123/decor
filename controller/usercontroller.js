const CustomError=require("../errors/index")
const User=require("../model/usermodel")
const createToken = require("../utils/createtoken")
const { assigncookies,permissionacces } = require("../utils")
const getAllUser=async(req,res)=>{
    const users=await User.find({role:"admin"}).select("-password")
    res.status(200).json({users})
}
const getsingleUser=async(req,res)=>{
    const currentuser=req.user
    const userId=req.params.id
    const user=await User.findById(userId).select("-password")
    const userdetail=permissionacces(currentuser,user)
    res.status(200).json({user})
}
const getCurrentUser=async(req,res)=>{
    const user=req.user
    console.log(user)

    res.status(200).json({userId:user.userId,name:user.name,role:user.role})
}
const updateUser=async(req,res)=>{
    const{name,email}=req.body
    if(!name&&!email){
        throw new CustomError.BadRequestError("please provide name and email")
    }
    console.log(req.user.userId)
    const user =await User.findByIdAndUpdate(req.user.userId,{name,email},{new:true})
    console.log(user)
    const tokendata=createToken(user)
    await assigncookies(res,tokendata)

    res.status(200).json({tokendata})
}
const updateUserPassword=async(req,res)=>{
    const {oldpassword,newpassword}=req.body
    if(!oldpassword&&!newpassword){
        throw new  CustomError.BadRequestError("please provide old and new password")
    }
    const userId=req.user.userId
    console.log("--------------------------------->>"+userId)
    const getuser=await User.findById(userId)
    const checkpass= await getuser.checkpassword(oldpassword)
   if(!checkpass){
throw new CustomError.BadRequestError("old password is incorrect")
    }
    getuser.password=newpassword
    await getuser.save()

    res.status(200).json({msg:"password sucessfully updated"})
}
module.exports={
    getAllUser,
    getsingleUser,
    getCurrentUser,
    updateUser,
    updateUserPassword
}