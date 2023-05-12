const express=require("express")
const {
    getAllOrders, 
    getSingleOrder,
    getCurrentUserOrders,
    createOrder, 
    updateOrder
}=require("../controller/ordercontroller")
const {authenticateUser,autherizeUser}=require("../middleware/authentication")

const orderRouter=express.Router()

orderRouter
.route("/")
.get(authenticateUser,autherizeUser("admin"),getAllOrders)
.post(authenticateUser,createOrder)

orderRouter.get("/showmyorder",authenticateUser,getCurrentUserOrders)

orderRouter
.route("/:id")
.get(authenticateUser,getSingleOrder)
.patch(authenticateUser,updateOrder)

module.exports=orderRouter