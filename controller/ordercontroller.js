const { StatusCodes } = require("http-status-codes")
const CustomError=require("../errors/index")
const Product=require("../model/productmodel.js")
const Order=require("../model/ordermodel.js")
const {permissionacces}=require("../utils/index")

const stripefakeapi=async (data)=>{
    const clientSecret="this is secret"
    return clientSecret
}


const createOrder=async(req,res)=>{
    const {cartItems,tax,shippingFee,}=req.body
    if(cartItems.length<1){
        throw new CustomError.BadRequestError("noting in the cart")
    }
    if(!tax||!shippingFee){
        throw new CustomError.BadRequestError("tax and shipping fee is not applied")
    }
    let orderItems=[]
    let  subtotal=0
    for (const  item of cartItems){
        console.log(item)
        const findproduct=await Product.findById(item.product)
        if(!findproduct){
            throw new CustomError.NotFoundError("Unable to find Product ")
        }
    
        const {name,image,price,_id}=findproduct
        const singleitemorder={
            name:name,
            amount:item.amount,
            price:price,
            image:image,
            product:_id
        }
        subtotal+=item.amount*price       
        orderItems=[...orderItems,singleitemorder]
        console.log(orderItems)
    }
    const finalprice=tax+shippingFee+subtotal
    const clientsecret=await stripefakeapi({
        amount:finalprice,
        currency:"INR"
    })

    const order=await Order.create({
        tax,
        shippingFee,
        subtotal,
        total:finalprice,
        orderItems,
        user:req.user.userId,
        clientsecret
        
    })


    res.status(StatusCodes.CREATED).json({order})
}
const getAllOrders=async(req,res)=>{
    const order = Order.find({})
    const limit=Number(req.query.limit)||1
    console.log(req.query.page)
    const page=Number(req.query.page)||1
    const skip=(page-1)*limit
    order.skip(skip).limit(limit)
    const result =await order
    res.status(StatusCodes.ACCEPTED).json({order:result,no:result.length})
}
const getCurrentUserOrders=async(req,res)=>{
    const order=await Order.find({user:req.user.userId})
    if(!order){
        throw new CustomError.NotFoundError("no oder blong to this user and oderID")
    }

    res.status(StatusCodes.ACCEPTED).json({order})
}
const getSingleOrder=async(req,res)=>{
    const orderId=req.params.id
    const order=await Order.findOne({user:req.user.userId,_id:orderId})
    if(!order){
        throw new CustomError.NotFoundError("no oder blong to this user and oderID")
    }
    permissionacces(req.user,order)

    
    res.status(StatusCodes.ACCEPTED).json({order})
}
const updateOrder=async(req,res)=>{
    const orderId=req.params.id
    const {paymentIntentId}=req.body
    const order=await Order.findOne({user:req.user.userId,_id:orderId})
    if(!order){
        throw new CustomError.NotFoundError("no oder blong to this user and oderID")
    }
    permissionacces(req.user,order)

    order.paymentintent=paymentIntentId
    order.status="paid"
    await order.save()

    
    res.status(StatusCodes.ACCEPTED).json({order})
}

module.exports={
    getAllOrders, 
    getSingleOrder,
    getCurrentUserOrders,
    createOrder, 
    updateOrder
}