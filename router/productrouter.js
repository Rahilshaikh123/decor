const express=require('express')
const{
    createProduct,
    getallProduct,
    getaProduct,
    deleteProduct,
    updateProduct,
    uploadImageProduct
}=require("../controller/productcontroller")
const {authenticateUser,autherizeUser}=require("../middleware/authentication")

const productrouter=express.Router()

productrouter
.route("/")
.get(getallProduct)
.post([authenticateUser,autherizeUser("admin")],createProduct)

productrouter.post("/uploadimg",[authenticateUser,autherizeUser("admin")],uploadImageProduct)

productrouter
.route("/:id")
.get(getaProduct)
.delete([authenticateUser,autherizeUser("admin")],deleteProduct)
.patch([authenticateUser,autherizeUser("admin")],updateProduct)

module.exports=productrouter;