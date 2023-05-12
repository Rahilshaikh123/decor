const express=require("express")
const { registerUser, loginUser, logoutUser } = require("../controller/authcontroller")
const authrouter =express.Router()

authrouter.route("/register").post(registerUser)
authrouter.route("/login").post(loginUser)
authrouter.get('/logout',logoutUser)

module.exports=authrouter