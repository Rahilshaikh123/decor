const mongoose=require("mongoose")
const reviewSchema=mongoose.Schema({
    rating : {
        type:Number,
        min:1,
        max:5,
        required:[true,"rate the product"]
    },
    title: {
        type:String,
        maxlength:30,
        required:true
    },
    comment: {
        type:String,
        maxlength:100
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    }


},{timestamps:true})

reviewSchema.statics.avgAndSumRating=async function(productid){
    
     result=await this.aggregate([
        {$match:{product:productid}},
        {$group:{
            _id:null,
            averageRating:{$avg:"$rating"},
            numOfReviews:{$sum:1}

        }}
    ])
    console.log(result)
    await this.model("Product").findOneAndUpdate({_id:productid},{
        averageRating:Math.ceil(result[0].averageRating)||0,
        numOfReviews:result[0].numOfReviews||0
    })

    

    }


reviewSchema.post("save",async function(){
   await this.constructor.avgAndSumRating(this.product)
    console.log("---------------------------------------------.")
    console.log(result)
  })
reviewSchema.post("remove",async function(){
    console.log("remove update")
  })

module.exports=mongoose.model("Review",reviewSchema)