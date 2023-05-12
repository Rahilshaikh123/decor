const express=require("express")
const reviewRouter=express.Router()
const {
    getAllReview,
    getAReview,
    createReview,
    deleteReview,
    updateReview,
    getsingleproductreview
}=require("../controller/reviewcontroller")
const {authenticateUser,autherizeUser}=require("../middleware/authentication")


reviewRouter.route("/").get(getAllReview).post(authenticateUser,createReview)
reviewRouter.route("/:id").get(getAReview).patch(authenticateUser,updateReview).delete(authenticateUser,deleteReview)
reviewRouter.get("/productreview/:id",getsingleproductreview)


module.exports=reviewRouter