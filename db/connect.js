const mongoose=require("mongoose")

const dbconnect=async(uri)=>{
  mongoose.set({strictQuery:false})
  await mongoose.connect(uri)
  console.log("connected to mongo db")
}

module.exports=dbconnect
