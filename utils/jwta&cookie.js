const Jwt=require("jsonwebtoken")

const createjwt=(user)=>{
    const createtoken=Jwt.sign(user,process.env.JWT_SECRET,{expiresIn:"30d"})
    return createtoken
}


const jwtverify=(token)=>{
   return Jwt.verify(token,process.env.JWT_SECRET)
}

const assigncookies=async (res,userr)=>{
    const token=createjwt({user:userr})

    res.cookie('token',token,{
        httpOnly:true,
        expire:new Date(Date.now() * (1000*60*60*24)),
        secure:process.env.NODE_ENV==="production",
        signed:true
    })


}

module.exports={
    createjwt,
    jwtverify,
    assigncookies
}
