const CustomError=require("../errors/index")
const Product=require("../model/productmodel.js")
const {StatusCodes}=require("http-status-codes")
const path=require("path")

const createProduct=async(req,res)=>{
    console.log(req.user)
    req.body.user=req.user.userId
    const product=await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({product})

}
const getallProduct=async(req,res)=>{
    const product=await Product.find({})
    res.status(StatusCodes.ACCEPTED).json({product,count:product.length})

}
const getaProduct=async(req,res)=>{
    const productid=req.params.id
    const product =await Product.findById(productid)
    if(!product){
        throw new CustomError.NotFoundError("Product notfound")
    }

    res.status(StatusCodes.ACCEPTED).json({product})

}
const deleteProduct=async(req,res)=>{
    const productid=req.params.id
    const product=await Product.findById(productid)
    if(!product){
        throw new CustomError.NotFoundError("Product notfound")
    }
    product.remove()

    res.status(200).json({msg:"product deleted sucessfully"})

}
const updateProduct=async(req,res)=>{
    const productid=req.params.id
    const updateproduct=req.body
    const updater=req.user.userId
    const dproduct=await Product.findById(productid)
    console.log(dproduct.user)
    if(!dproduct){
        throw new CustomError.NotFoundError("no Product found")
    }
    if(updater!=dproduct.user){
        throw new CustomError.UnauthenticatedError("ghfh")
    }
    const product=await Product.findByIdAndUpdate(productid,updateproduct,{new:true})


    res.status(200).json({product})

}
const uploadImageProduct=async(req,res)=>{
    let productIMG=req.files.image
    if(!productIMG){
        throw new CustomError.BadRequestError("please provideproduct image")
    }
    let imgpath=path.join(__dirname,"../public/productimgupload/"+`${productIMG.name}`)
    productIMG.mv(imgpath)


    res.status(200).json({imgpath:`/productimgupload/${productIMG.name}`})

}
module.exports={
    createProduct,
    getallProduct,
    getaProduct,
    deleteProduct,
    updateProduct,
    uploadImageProduct
}
