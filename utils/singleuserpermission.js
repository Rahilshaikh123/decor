const CustomError=require("../errors/index")
const permissionacces=(currenttuser,requestuser)=>{
    const getuserdetails=currenttuser.userId
    const user=String(requestuser._id)
    if(currenttuser.role==="admin")return;
    console.log(getuserdetails,user)
    if(getuserdetails===user)return;
    throw new CustomError.UnauthenticatedError("routeis not accesible for normalusers")




}
module.exports=permissionacces