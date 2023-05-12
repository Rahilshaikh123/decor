const {StatusCodes}=require("http-status-codes")
class UnauthorizedError extends Error{
    constructor(message){
        super(message)
        this.StatusCodes=StatusCodes.FORBIDDEN
    }
}
module.exports=UnauthorizedError