const CustomError=require("../errors/index")
const {StatusCodes}=require("http-status-codes")
const Product=require("../model/productmodel.js")
const Review=require("../model/reviewmidel")
const { permissionacces } = require("../utils")
const getAllReview=async (req,res)=>{
    const reviews=await Review.find({}).populate({path:"product",select:"name company"})
    res.status(200).json({reviews})
}
const getAReview=async (req,res)=>{
    const getreview=req.params.id
    const review=await Review.findById(getreview)
    if(!review){
        throw new CustomError.NotFoundError("no review for id")
    }
    res.status(200).json({review})
}
const createReview=async (req,res)=>{

    const productId=req.body.product
    console.log(req.user)
    req.body.user=req.user.userId
    const product =await Product.findById(productId)
    if(!product){
        throw new CustomError.NotFoundError("product not found")
    }
    const isreviewExist=await Review.findOne({user:req.user.userId,product:product._id})
    if(isreviewExist){
        throw new CustomError.BadRequestError("you cant  provide more than one review")
    }
    const review =await Review.create(req.body)
    res.status(200).json({review})
}
const deleteReview=async (req,res)=>{
    const reviewid=req.params.id
    const deletereview=await Review.findOne({_id:reviewid})
    
    if(!deletereview){
        throw new CustomError.NotFoundError("no review found")
    }
    permissionacces(req.user,deletereview.user)
    await deletereview.remove()
    res.status(200).json({deletereview})
}
const updateReview=async (req,res)=>{
    const reviewid=req.params.id
    const upreview=await Review.findOne({_id:reviewid})
    
    if(!upreview){
        throw new CustomError.NotFoundError("no review found")
    }

    permissionacces(req.user,upreview.user)
    upreview.rating=req.body.rating||upreview.rating
    upreview.title=req.body.title
    upreview.comment=req.body.comment
    await upreview.save()
    res.status(200).json({upreview})
}
const getsingleproductreview =async(req,res)=>{
    const productid=req.params.id
    const review=await Review.find({product:productid})
    res.status(200).json(review)
}


module.exports={
    getAllReview,
    getAReview,
    createReview,
    deleteReview,
    updateReview,
    getsingleproductreview
}

