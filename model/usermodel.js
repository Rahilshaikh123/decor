const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        rquired:true,
        maxlenght:30,
        minlenght:4
    },
    email:{
        type:String,
        rquired:true,
        unique:true,
        match:/^([a-zA-Z0-9]+@+[a-zA-Z]+\.+[a-z]{2,3})/
    
    },
    password:{
        type:String,
        rquired:true,
        minlenght:6
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }

})

UserSchema.pre("save",async function(){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hashSync(this.password,salt)
    console.log(this.password)
})

UserSchema.method("checkpassword",async function checkpassword(password){
    const ispasscorrect=await bcrypt.compare(password,this.password)
    return ispasscorrect
})
module.exports=mongoose.model("User",UserSchema)