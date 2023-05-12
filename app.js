require("dotenv").config()
require("express-async-errors")

const express=require("express")
const morgan=require("morgan")
const cookieparser=require("cookie-parser")
const fileUpload=require("express-fileupload")


const ratelimiter=require("express-rate-limit")
const helmet=require("helmet")
const xss=require("xss-clean")
const cors=require("cors")
const mongosanatize=require("express-mongo-sanitize")

const errorHandlerMiddleware=require("./middleware/error-handler")
const notfoundmiddleware=require("./middleware/not-found")
const authrouter = require("./router/authrouter")
const userrouter=require("./router/userrouter")
const productrouter=require("./router/productrouter")
const reviewRouter=require("./router/reviewrouter")
const orderRouter=require("./router/orderrouter")
const dbconnect = require("./db/connect")
const app=express()


const PORT=process.env.PORT||5000

app.use(ratelimiter({
    windowsMs:15*60*1000,    //15min
    max:100,
}))
app.use(cors())
app.use(xss())
app.use(helmet())
app.use(mongosanatize())


app.use(morgan("common"))
app.use(express.json())
app.use(fileUpload())
app.use(cookieparser(process.env.JWT_SECRET))
app.use(express.static('public'))

app.get("/",(req,res)=>{
    console.log(req.signedCookies)
})
app.use("/api/v1/auth",authrouter)
app.use("/api/v1/user",userrouter)
app.use("/api/v1/products",productrouter)
app.use("/api/v1/review",reviewRouter)
app.use("/api/v1/order",orderRouter)


app.use(notfoundmiddleware)
app.use(errorHandlerMiddleware)



const server=async()=>{
    try {
        await dbconnect(process.env.MONGODB_URI)
        await app.listen(PORT,()=>{
            console.log(`your sever is stareted on PORT :${PORT}`)
})
    } catch (error) {
        console.log(error)
        
    }
}
server()

