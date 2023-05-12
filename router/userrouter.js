const express=require("express")
const { getAllUser, getCurrentUser, updateUser, updateUserPassword, getsingleUser } = require("../controller/usercontroller")
const {authenticateUser,autherizeUser}= require("../middleware/authentication")
const userRouter=express.Router()

userRouter.get("/users",authenticateUser,autherizeUser("admin","owner"),getAllUser)
userRouter.get("/showme",authenticateUser,getCurrentUser)
userRouter.patch("/update",authenticateUser,updateUser)
userRouter.patch("/updatepass",authenticateUser,updateUserPassword)
userRouter.get("/:id",authenticateUser,getsingleUser)

module.exports=userRouter