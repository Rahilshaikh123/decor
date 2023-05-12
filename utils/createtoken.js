const {assigncookies}=require("./jwta&cookie")
const createToken=(user)=>{
    return {userId:user._id,name:user.name,role:user.role}

}
module.exports=createToken